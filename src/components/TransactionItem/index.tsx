import { Flex, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import NumberFormat from "react-number-format";

interface IItem {
  amount: string;
  date: string;
  description: string;
  checkUrl?: string;
  _id?: string;
}

interface IParams {
  item: IItem;
  isPurchase: boolean;
  onSelectedItem: (item: any) => void;
}

const TransactItem: React.FC<IParams> = ({
  item,
  isPurchase,
  onSelectedItem,
}) => {
  return (
    <Flex
      borderBottomColor="gray.100"
      borderBottomWidth="1px"
      cur
      pt="4"
      mr="8"
      pb="4"
      onClick={() => onSelectedItem(item)}
    >
      <Flex color="blue.500" direction="column">
        <Text fontWeight="bold">{item.description}</Text>
        <Text fontSize="sm">{item.date}</Text>
      </Flex>
      <Spacer />
      <Flex mr="8" align="center">
        <Text color={isPurchase ? "blue.500" : "red.500"}>
          <NumberFormat
            value={item.amount}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            renderText={(value) => (
              <Text>
                {`${isPurchase ? `` : `-`}`} {value}
              </Text>
            )}
          />
        </Text>
      </Flex>
    </Flex>
  );
};

export default TransactItem;
