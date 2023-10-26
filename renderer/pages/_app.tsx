import { ChakraProvider, Box } from "@chakra-ui/react";
import { Navbar } from "../components/Navbar";
import theme from "../lib/theme";
import { AppProps } from "next/app";

const globalStyles = `
  body {
    min-width: 640px;
    overflow: scroll;
  }
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
        {globalStyles}
      </style>
      <ChakraProvider theme={theme}>
        <Box minHeight="100vh" w="100%" m="auto" p="0">
          <Navbar />
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
