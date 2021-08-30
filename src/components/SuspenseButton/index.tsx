import { Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { RiAddFill } from "react-icons/ri";

interface IProps {
  onClick: () => void;
}

const SuspenseButton: React.FC<IProps> = ({ onClick }) => {
  return (
    <Flex
      as="button"
      bg="blue.500"
      width="50px"
      height="50px"
      borderRadius="50px"
      justify="center"
      align="center"
      position="fixed"
      bottom="0"
      right="0"
      mr="8"
      mb="8"
      onClick={onClick}
    >
      <Icon as={RiAddFill} w={8} h={8} color="white" />
    </Flex>
  );
};

export default SuspenseButton;
