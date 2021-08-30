import { Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import NumberFormat from "react-number-format";
import { useCurrentBalance } from "../../contexts/BalanceContext";

const CurrentBalance = () => {
  const { currentBalance } = useCurrentBalance();

  return (
    <Flex direction="column" width="100">
      <Stack spacing={1}>
        <Text fontSize="xl">Current balance</Text>

        <NumberFormat
          value={currentBalance}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
          renderText={(value) => (
            <Text fontSize="2xl" fontWeight="bold">
              {value}
            </Text>
          )}
        />
      </Stack>
    </Flex>
  );
};

export default CurrentBalance;
