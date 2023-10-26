import { MouseEvent } from "react";
import { Button, Flex, Heading, HStack, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export const Navbar = () => {
  const router = useRouter();
  console.log({ router });
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      h="5rem"
      w="100%"
      p="0 2.5rem"
      borderBottom="1px solid black"
    >
      <Image src="/arweave_logo.svg" />
      <HStack
        gap={8}
        sx={{
          "a:hover > *": {
            fontWeight: "500 !important",
          },
        }}
      >
        <Link href="/home">
          <Heading
            fontSize="1.2rem"
            fontWeight={router.route.startsWith("/home") ? "500" : "300"}
            fontFamily="mono"
          >
            {"Home"}
          </Heading>
        </Link>
        <Link href="/dashboard">
          <Heading
            fontSize="1.2rem"
            fontWeight={router.route.startsWith("/dashboard") ? "500" : "300"}
            fontFamily="mono"
          >
            {"Dashboard"}
          </Heading>
        </Link>
        <Link href="/learn">
          <Heading
            fontSize="1.2rem"
            fontWeight={router.route.startsWith("/learn") ? "500" : "300"}
            fontFamily="mono"
          >
            {"Learn"}
          </Heading>
        </Link>
        <Link
          href="https://discord.gg/mRbVUwJxAH"
          onClick={(event: MouseEvent) => {
            if (window.ipc) {
              event.preventDefault();
              window.ipc.send("open-url", "https://discord.gg/mRbVUwJxAH");
            }
          }}
        >
          <Heading fontSize="1.2rem" fontWeight="300" fontFamily="mono">
            {"Discord"}
          </Heading>
        </Link>
      </HStack>
      <Button bgColor="buttonColor" color="buttonTextColor">
        Connect
      </Button>
    </Flex>
  );
};
