import {
  Box,
  Flex,
  Heading,
  Icon,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import CategoryBalance from "../components/CategoryBalance";
import CurrentBalance from "../components/CurrentBalance";
import HeaderWithAccess from "../components/Headers/WithAccess";
import MonthDate from "../components/Selects/MonthDate";
import TransactItem from "../components/TransactionItem";
import { useRouter } from "next/router";
import { useGetAllTransactions } from "../hooks/useGetAllTransactions";
import { useCurrentBalance } from "../contexts/BalanceContext";

const Balance = () => {
  const router = useRouter();

  const { data } = useGetAllTransactions();

  const { changeBalance } = useCurrentBalance();

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  console.log(`data`, data);

  useEffect(() => {
    let totalAmount = 0;
    let totalIncome = 0;
    let totalExpense = 0;

    data?.forEach((element) => {
      const amount = parseFloat(element.amount.replace(`,`, ``));

      if (element.checkUrl) {
        totalAmount += amount;
        totalIncome += amount;
      } else {
        totalAmount -= amount;
        totalExpense += amount;
      }
    });

    changeBalance(totalAmount);
    setTotalExpense(totalExpense);
    setTotalIncome(totalIncome);
  }, [data, changeBalance]);

  return (
    <Flex direction="column" h="100%">
      <HeaderWithAccess title="BNB Bank" />

      <Flex w="100%" mx="auto">
        <Box flex="1" bg="blue.200" pl="8" pr="8" pb="3" color="white">
          <Flex>
            <CurrentBalance />
            <Spacer flex="1" />
            <MonthDate />
          </Flex>
        </Box>
      </Flex>

      <Flex direction="column">
        <CategoryBalance
          onClick={() => {
            router.push("check-deposit");
          }}
          bg="blue.100"
          title="Incomes"
          value={totalIncome}
          titleButton="DEPOSIT A CHECK"
        />
        <CategoryBalance
          onClick={() => {
            router.push("purchase");
          }}
          bg="blue.50"
          title="Expenses"
          value={totalExpense}
          titleButton="PURCHASE"
        />

        <Flex pl="8" pt="8" direction="column">
          <Heading color="blue.300" as="h3" size="sm" pb="6">
            TRANSACTIONS
          </Heading>

          {data?.map((item, index) => (
            <TransactItem
              key={index}
              item={item}
              isPurchase={item.status}
              onSelectedItem={(item) => {
                return;
              }}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Balance;
