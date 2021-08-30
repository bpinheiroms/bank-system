import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import HeaderWithAccess from "../components/Headers/WithAccess";
import MonthDate from "../components/Selects/MonthDate";
import SuspenseButton from "../components/SuspenseButton";
import TransactItem from "../components/TransactionItem";
import { useRouter } from "next/router";
import { useGetDepositsControl } from "../hooks/useGetDepositsControl";
import CheckDetail from "../components/CheckDetail";
import { useDepositStatus } from "../hooks/useDepositStatus";

const CheckControl = () => {
  const [itemSelected, setItemSelected] = useState<any>(null);

  const [checkControl, setCheckControl] = useState(null);

  const { loading, data } = useGetDepositsControl(itemSelected);

  const dataMemo = useMemo(() => {
    if (checkControl) {
      return data.filter((x) => x._id !== checkControl._id);
    }

    return data;
  }, [data, checkControl]);

  useDepositStatus(checkControl);

  const handleStatus = (item, status) => {
    const data = { ...item, status: status };
    setCheckControl(data);
    setItemSelected(null);
  };

  return (
    <Flex direction="column" h="100%">
      <HeaderWithAccess title="Check Control" />

      {itemSelected ? (
        <CheckDetail
          item={itemSelected}
          onBack={() => setItemSelected(null)}
          onChangeStatus={handleStatus}
        />
      ) : (
        <Flex pl="8" pt="8" direction="column">
          {dataMemo.map((item, index) => (
            <TransactItem
              key={index}
              item={item}
              isPurchase
              onSelectedItem={(item) => setItemSelected(item)}
            />
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default CheckControl;
