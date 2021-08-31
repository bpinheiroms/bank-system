import React, { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputProps as ChakraInputProps,
  InputRightElement,
} from "@chakra-ui/react";
import NumberFormat from "react-number-format";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
  isCurrency?: boolean;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, isCurrency, error = null, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      {isCurrency ? (
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
            children="$"
          />
          <ChakraInput
            name={name}
            id={name}
            variant="flushed"
            focusBorderColor="blue.500"
            bgColor="white"
            borderColor="blue.500"
            size="lg"
            type="number"
            ref={ref}
            {...rest}
          />
        </InputGroup>
      ) : (
        <ChakraInput
          name={name}
          id={name}
          variant="flushed"
          focusBorderColor="blue.500"
          bgColor="white"
          borderColor="blue.500"
          size="lg"
          ref={ref}
          {...rest}
        />
      )}

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const InputFlushed = forwardRef(InputBase);
