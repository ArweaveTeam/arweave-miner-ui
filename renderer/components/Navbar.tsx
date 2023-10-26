import { Button, Flex, Heading, HStack, Image } from "@chakra-ui/react";

export const Navbar = () => (
  <Flex justifyContent="space-between" alignItems="center" h="5rem" w="100%" p="0 2.5rem">
    <Image src="/arweave_logo.svg" />
    <HStack gap={8}>
      <Heading fontSize="1vw" fontWeight="500" fontFamily="mono">
        {"Home"}
      </Heading>
      <Heading fontSize="1vw" fontWeight="500" fontFamily="mono">
        {"Dashboard"}
      </Heading>
      <Heading fontSize="1vw" fontWeight="500" fontFamily="mono">
        {"Learn"}
      </Heading>
      <Heading fontSize="1vw" fontWeight="500" fontFamily="mono">
        {"Discord"}
      </Heading>
    </HStack>
    <Button bgColor="buttonColor" color="buttonTextColor">
      Connect
    </Button>
  </Flex>
);
