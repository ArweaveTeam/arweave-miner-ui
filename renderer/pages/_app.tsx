import { ChakraProvider } from "@chakra-ui/react";
import theme from "../lib/theme";
import { AppProps } from "next/app";

const fontFamily = `
  @font-face {
    font-family: "Roboto Mono";
    src: url("/fonts/Roboto_Mono/RobotoMono-VariableFont_wght.ttf") format("truetype");
    font-weight: 125 950;
    font-stretch: 75% 125%;
    font-style: normal;
  }`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style global jsx>
        {fontFamily}
      </style>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
