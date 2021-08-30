import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import React, { forwardRef, useState } from "react";
import CurrentBalance from "../components/CurrentBalance";
import HeaderWithAccess from "../components/Headers/WithAccess";
import { InputFlushed } from "../components/Form/InputFlushed";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { usePurchase } from "../hooks/usePurchase";
import { useCurrentBalance } from "../contexts/BalanceContext";
import { notifyMessage } from "../helpers/notification";

type PurchaseFormData = {
  amount: string;
  description: string;
};

const purchaseSchema = yup.object().shape({
  amount: yup.string().required("Required amount"),
  description: yup.string().required("Required description"),
});

const Purchase = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(purchaseSchema),
  });

  const [startDate, setStartDate] = useState(new Date());

  const { currentBalance } = useCurrentBalance();

  const [purchaseSend, setPurchaseSend] = useState(null);
  const [loading] = usePurchase(purchaseSend);

  const { errors } = formState;

  const handlePurchase: SubmitHandler<PurchaseFormData> = async (value) => {
    const amountWithoutFormat = parseFloat(value.amount.replace(`,`, ``));

    if (amountWithoutFormat > currentBalance) {
      notifyMessage(true, `The amount must be less than the current balance`);
      return;
    }
    setPurchaseSend({ ...value, date: startDate });
  };

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <Flex onClick={onClick} align="flex-end">
      <Text
        fontSize="2xl"
        color="blue.500"
        size="sm"
        cursor="pointer"
        borderBottomWidth="1px"
        borderBottomColor="blue.500"
        ref={ref}
      >
        {value}
      </Text>
    </Flex>
  ));

  return (
    <Flex direction="column" h="100%">
      <HeaderWithAccess title="Purchase" />

      <Flex w="100%" mx="auto">
        <Box flex="1" bg="blue.200" pl="8" pr="8" pb="3" color="white">
          <Flex>
            <CurrentBalance />
          </Flex>
        </Box>
      </Flex>

      <Flex
        direction="column"
        as="form"
        flexDir="column"
        pl="8"
        pr="8"
        pt="20"
        onSubmit={handleSubmit(handlePurchase)}
      >
        <Stack spacing="24px">
          <Flex>
            <InputFlushed
              name="amount"
              type="amount"
              isCurrency
              placeholder="Amount"
              error={errors.amount}
              {...register("amount")}
            />
            <Flex
              as="text"
              align="center"
              justify="center"
              color="blue.500"
              fontWeight="bold"
              fontSize="20px"
              width="100px"
            >
              USD
            </Flex>
          </Flex>

          <InputFlushed
            name="description"
            type="description"
            placeholder="Description"
            error={errors.description}
            {...register("description")}
          />

          <DatePicker
            color="blue"
            selected={startDate}
            dateFormat="MMMM dd, yyyy"
            onChange={(date) => setStartDate(date)}
            customInput={<CustomInput />}
          ></DatePicker>
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="blue"
          size="lg"
          color="white"
          isLoading={formState.isSubmitting}
          position="fixed"
          bottom="0"
          width="90%"
          mb="50px"
        >
          Add Purchase
        </Button>
      </Flex>
    </Flex>
  );
};

export default Purchase;
