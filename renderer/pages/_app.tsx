import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wrapper } from "../store";
import "../styles/globals.css";

export default function ArweaveMinerUi({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
}
