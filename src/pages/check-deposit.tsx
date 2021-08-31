import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import CurrentBalance from "../components/CurrentBalance";
import HeaderWithAccess from "../components/Headers/WithAccess";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputFlushed } from "../components/Form/InputFlushed";
import { useDropzone } from "react-dropzone";
import { Image } from "@chakra-ui/react";
import NumberFormat from "react-number-format";
import { inputMoneyMask } from "../helpers/formats";
import { useDepositCheck } from "../hooks/useDepositCheck";

type FormData = {
  amount: string;
  description: string;
};

const purchaseSchema = yup.object().shape({
  amount: yup
    .string()
    .required("Required amount")
    .matches(/^(\d*\,)?\d+$/, "Only with `,` ! Ex: 1,000"),
  description: yup.string().required("Required description"),
});

const CheckDeposit = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(purchaseSchema),
  });

  const { errors } = formState;

  const [checkUrl, setCheckUrl] = useState(``);

  const [depositSend, setDepositSend] = useState(null);
  const [loading] = useDepositCheck(depositSend);

  async function uploadImage(file: any) {
    const url = process.env.NEXT_PUBLIC_CLOUDINARY_URL;

    const formData = new FormData();

    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data;
  }

  const handleDeposit: SubmitHandler<FormData> = async (value) => {
    const data = {
      amount: value.amount.replace(`,`, ``),
      description: value.description,
      checkUrl: checkUrl,
      date: new Date(),
    };

    setDepositSend(data);
  };

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(async (file) => {
      const data = await uploadImage(file);

      setCheckUrl(data.secure_url);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*",
  });

  return (
    <Flex direction="column" h="100%">
      <HeaderWithAccess title="Check Deposit" />

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
        onSubmit={handleSubmit(handleDeposit)}
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

          <Text fontSize="sm" color="gray">
            *The money will be deposited in your account once the check is
            accepted.
          </Text>

          <InputFlushed
            name="description"
            type="description"
            placeholder="Description"
            error={errors.description}
            {...register("description")}
          />

          {checkUrl ? (
            <Image height="200px" src={checkUrl} />
          ) : (
            <Flex
              {...getRootProps()}
              borderWidth="4px"
              height="200px"
              justify="center"
              align="center"
              cursor="pointer"
              borderStyle="dashed"
            >
              <input {...getInputProps()} />
              <Text color="blue.500">UPLOAD CHECK PICTURE</Text>
            </Flex>
          )}
        </Stack>

        <Button
          type="submit"
          disabled={!checkUrl}
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
          Deposit Check
        </Button>
      </Flex>
    </Flex>
  );
};

export default CheckDeposit;
