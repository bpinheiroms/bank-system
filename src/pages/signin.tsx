import { Flex, Button, Stack, Text } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "../components/Form/Input";
import React, { useState } from "react";
import HeaderWithoutAccess from "../components/Headers/WithoutAccess";
import { useLoginAuth } from "../hooks/useLoginAuth";
import { useRouter } from "next/router";

const signInFormSchema = yup.object().shape({
  email: yup.string().required("Required email").email("Invalid email"),
  password: yup.string().required("Password Required"),
});

const SignIn = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { errors } = formState;

  const [userLogin, setUserLogin] = useState(null);
  const [loading] = useLoginAuth(userLogin);
  const router = useRouter();

  function handleSignIn(data) {
    setUserLogin(data);
  }

  return (
    <>
      <HeaderWithoutAccess />
      <Flex w="100vw" h="90vh" align="center" justify="center">
        <Flex
          as="form"
          width="80%"
          maxWidth={360}
          p="8"
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="4">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              error={errors.email}
              {...register("email")}
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              error={errors.password}
              {...register("password")}
            />
          </Stack>

          <Button
            type="submit"
            mt="6"
            disabled={loading}
            colorScheme="blue"
            size="lg"
            color="white"
            isLoading={formState.isSubmitting}
            data-cy="submit"
          >
            Sign In
          </Button>

          <Button
            data-cy="signUp"
            mt="2"
            color="blue.500"
            onClick={() => router.push("signup")}
          >
            New here? Sign Up
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default SignIn;
