import { Box, Flex, Icon, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { RiAddFill } from "react-icons/ri";
import NumberFormat from "react-number-format";

interface IProps {
  bg: string;
  title: string;
  value: number;
  titleButton: string;
  onClick: () => void;
}

const CategoryBalance: React.FC<IProps> = ({
  bg,
  title,
  value,
  titleButton,
  onClick,
}) => {
  return (
    <Box pl="8" pt="4" pb="2" width="100%" bg={bg}>
      <Flex color="blue.400">
        <Flex direction="column" fontWeight="bold">
          <Text>{title}</Text>

          <NumberFormat
            value={value}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            renderText={(value) => <Text>{value}</Text>}
          />
        </Flex>
        <Spacer />
        <Flex
          as="button"
          width="200px"
          mr="8"
          align="center"
          justify="center"
          direction="column"
          onClick={onClick}
        >
          <Icon as={RiAddFill} w={6} h={6} />
          <Text fontSize="sm">{titleButton}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CategoryBalance;
