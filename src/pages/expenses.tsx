import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import HeaderWithAccess from "../components/Headers/WithAccess";
import MonthDate from "../components/Selects/MonthDate";
import SuspenseButton from "../components/SuspenseButton";
import TransactItem from "../components/TransactionItem";
import { useRouter } from "next/router";

const Expenses = () => {
  const router = useRouter();

  return (
    <Flex direction="column" h="100%">
      <HeaderWithAccess title="Expenses" />

      <Flex w="100%" mx="auto">
        <Box flex="1" bg="blue.200" pl="8" pr="8" pb="3" color="white">
          <Flex>
            <MonthDate />
          </Flex>
        </Box>
      </Flex>

      <Flex pl="8" pt="8" direction="column">
        {/* <TransactItem
          amount="$40"
          description="t-shirt"
          date="08/18/2021, 02:25 PM"
          isPurchase
        /> */}
      </Flex>

      <SuspenseButton
        onClick={() => {
          router.push("purchase")
        }}
      />
    </Flex>
  );
};

export default Expenses;
