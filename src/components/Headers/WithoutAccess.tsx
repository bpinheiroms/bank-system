import { Flex, Heading } from "@chakra-ui/react";
import React from "react";


const HeaderWithoutAccess = () => {
  return (
    <Flex
      position="fixed"
      h="20%"
      align="center"
      justify="center"
      bgColor="blue.500"
      w="100vw"
      as="header"
    >
      <Heading color="white">BNB Bank</Heading>
    </Flex>
  );
};

export default HeaderWithoutAccess;