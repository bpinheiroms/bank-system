import { Flex, Button, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "../components/Form/Input";
import React, { useState } from "react";
import HeaderWithoutAccess from "../components/Headers/WithoutAccess";
import { useRegisterUser } from "../hooks/useRegisterUser";
import { useRouter } from "next/router";

type SignUpFormData = {
  email: string;
  password: string;
  username: string;
};

const signUpFormSchema = yup.object().shape({
  email: yup.string().required("Required email").email("Invalid email"),
  password: yup.string().required("Password Required"),
  username: yup.string().required("Username Required"),
});

const SignUp = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signUpFormSchema),
  });

  const [userRegister, setUserRegister] = useState(null);
  const [loading] = useRegisterUser(userRegister);

  const { errors } = formState;
  const router = useRouter();

  function handleSignUp(data) {
    setUserRegister(data);
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
          onSubmit={handleSubmit(handleSignUp)}
        >
          <Stack spacing="4">
            <Input
              name="username"
              type="username"
              placeholder="Username"
              error={errors.username}
              {...register("username")}
            />
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
            Sign Up
          </Button>
          <Button mt="2" color="blue.500" onClick={() => router.push("signin")}>
            Already have an account?
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default SignUp;
