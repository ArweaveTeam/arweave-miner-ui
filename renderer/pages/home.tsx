import React from "react";
import Head from "next/head";
import { Button, Link as ChakraLink } from "@chakra-ui/react";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";

export default function HomePage() {
  const [message, setMessage] = React.useState("No message found");

  React.useEffect(() => {
    window.ipc.on("message", (message: string) => {
      setMessage(message);
    });
  }, []);
  console.log({ message });

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-chakra-ui)</title>
      </Head>
      <Container minHeight="100vh">
        <DarkModeSwitch />
        <Hero title={`⚡Electron⚡ + Next.js + Chakra UI = 🔥`} />
        <Footer>
          <Button
            as={ChakraLink}
            href="/next"
            variant="solid"
            colorScheme="teal"
            rounded="button"
            width="full"
          >
            Go to next page
          </Button>
        </Footer>
      </Container>
    </React.Fragment>
  );
}
