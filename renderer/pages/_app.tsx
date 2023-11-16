import { AppProps } from "next/app";
import "../styles/globals.css";
import { wrapper } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
