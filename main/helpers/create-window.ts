import os from "os";
import {
  nativeImage,
  screen,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Rectangle,
} from "electron";
import Store from "electron-store";

export const createWindow = (
  windowName: string,
  options: BrowserWindowConstructorOptions,
): BrowserWindow => {
  const key = "window-state";
  const name = `window-state-${windowName}`;
  const store = new Store<Rectangle>({ name });
  const defaultSize: Rectangle = {
    width: options.width || 800,
    height: options.height || 600,
    x: 0,
    y: 0,
  };

  let state: Rectangle = { x: 0, y: 0, width: 0, height: 0 };

  const restore = () => store.get(key, defaultSize);

  const getCurrentPosition = () => {
    const position = mainWindow.getPosition();
    const size = mainWindow.getSize();
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1],
    };
  };

  const windowWithinBounds = (windowState: Rectangle, bounds: Rectangle) => {
    return (
      windowState.x >= bounds.x &&
      windowState.y >= bounds.y &&
      windowState.x + windowState.width <= bounds.x + bounds.width &&
      windowState.y + windowState.height <= bounds.y + bounds.height
    );
  };

  const resetToDefaults = () => {
    const bounds = screen.getPrimaryDisplay().bounds;
    return Object.assign({}, defaultSize, {
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2,
    });
  };

  const ensureVisibleOnSomeDisplay = (windowState: Rectangle) => {
    const visible = screen.getAllDisplays().some((display) => {
      return windowWithinBounds(windowState, display.bounds);
    });
    if (!visible) {
      // Window is partially or fully not visible now.
      // Reset it to safe defaults.
      return resetToDefaults();
    }
    return windowState;
  };

  const saveState = () => {
    if (!mainWindow.isMinimized() && !mainWindow.isMaximized()) {
      Object.assign(state, getCurrentPosition());
    }
    store.set(key, state);
  };

  state = ensureVisibleOnSomeDisplay(restore());

  const mainWindow = new BrowserWindow({
    ...state,
    ...options,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      contextIsolation: true,
      sandbox: false,
      ...options.webPreferences,
    },
  });

  switch (os.platform()) {
    case "darwin":
      mainWindow.setIcon(nativeImage.createFromPath("resources/icon.icns"));
      break;
    case "win32":
      mainWindow.setIcon(nativeImage.createFromPath("resources/icon.ico"));
      break;
    default:
      mainWindow.setIcon(nativeImage.createFromPath("resources/arweave_icon.png"));
      break;
  }

  mainWindow.on("close", saveState);

  return mainWindow;
};
