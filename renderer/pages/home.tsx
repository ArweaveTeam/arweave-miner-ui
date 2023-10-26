import React from "react";
import Head from "next/head";
import { Button, Box, Container, Heading, Text, TextProps, VStack } from "@chakra-ui/react";

const buttonTextProps: TextProps = {
  fontFamily: "mono",
  fontWeight: "400",
  fontSize: "1.2rem",
  textTransform: "uppercase",
};

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
        <title>Arweave-Miner Home</title>
      </Head>
      <Container h="100%" display="flex" ml="2.4rem" mt="40vh">
        <VStack textAlign="left" alignItems="flex-start" alignSelf="center">
          <Heading fontFamily="mono" fontWeight="400">
            Arweave Mining Dashboard
          </Heading>
          <Heading fontFamily="mono" fontWeight="100" fontSize="1.8rem">
            Connect to view your stats of your experience mining.
          </Heading>
          <Box fontFamily="mono" fontWeight="400" mt="2.4rem">
            <Button p="30px" bgColor="buttonColor">
              <Text {...buttonTextProps} color="buttonTextColor">
                Connect to dashboard
              </Text>
            </Button>
            <Button marginLeft="2.4rem" p="30px" bg="transparent" border="1px solid black">
              <Text {...buttonTextProps}>Learn</Text>
            </Button>
          </Box>
        </VStack>
      </Container>
    </React.Fragment>
  );
}
