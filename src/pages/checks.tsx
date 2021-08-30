import { Box, Flex } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import HeaderWithAccess from "../components/Headers/WithAccess";
import MonthDate from "../components/Selects/MonthDate";
import SuspenseButton from "../components/SuspenseButton";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import TransactItem from "../components/TransactionItem";
import { useRouter } from "next/router";
import { useGetDepositsCheck } from "../hooks/useGetDeposits";

const Checks = () => {
  const router = useRouter();

  const { loading, data } = useGetDepositsCheck();

  const dataMemo = useMemo(() => {
    if (data && data.length) {
      const peding = data.filter((x) => x.status === 1);
      const accepted = data.filter((x) => x.status === 2);
      const rejected = data.filter((x) => x.status === 3);

      return { peding, accepted, rejected };
    }

    return null;
  }, [data]);

  console.log(`dataMemo`, dataMemo);

  return (
    <Flex direction="column" h="100%">
      <HeaderWithAccess title="Checks" />

      <Flex w="100%" mx="auto">
        <Box flex="1" bg="blue.200" pl="8" pr="8" pb="3" color="white">
          <Flex>
            <MonthDate />
          </Flex>
        </Box>
      </Flex>

      <Tabs isFitted color="blue.500">
        <TabList>
          <Tab>PEDING</Tab>
          <Tab>ACCEPTED</Tab>
          <Tab>REJECTED</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {dataMemo?.peding.map((data, index) => (
              <TransactItem
                key={index}
                item={data}
                isPurchase
                onSelectedItem={() => {
                  return;
                }}
              />
            ))}
          </TabPanel>
          <TabPanel>
            {dataMemo?.accepted.map((data, index) => (
              <TransactItem
                key={index}
                item={data}
                isPurchase
                onSelectedItem={() => {
                  return;
                }}
              />
            ))}
          </TabPanel>
          <TabPanel>
            {dataMemo?.rejected.map((data, index) => (
              <TransactItem
                key={index}
                item={data}
                isPurchase
                onSelectedItem={() => {
                  return;
                }}
              />
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>

      <SuspenseButton
        onClick={() => {
          router.push("check-deposit");
        }}
      />
    </Flex>
  );
};

export default Checks;
