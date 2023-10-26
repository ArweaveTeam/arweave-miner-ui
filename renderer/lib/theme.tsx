import { extendTheme } from "@chakra-ui/react";

const fonts = { mono: `'Roboto Mono', monospace` };

const breakpoints = {
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
};

const theme = extendTheme({
  global: {
    body: {
      bg: "#F1F1F1",
    },
  },
  semanticTokens: {
    colors: {
      text: {
        default: "#16161D",
        _dark: "#ade3b8",
      },
      buttonColor: {
        default: "#494949",
        _dark: "#e3a7f9",
      },
      buttonTextColor: {
        default: "#D9D9D9",
        _dark: "#494949",
      },
    },
    radii: {
      button: "12px",
    },
  },
  colors: {
    black: "#16161D",
  },
  fonts,
  breakpoints,
});

export default theme;
