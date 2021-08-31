import React, { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
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
        <NumberFormat
          thousandSeparator={true}
          decimalSeparator="."
          displayType="input"
          name={name}
          style={{
            width: `100%`,
            outline: `2px solid transparent`,
            borderBottom: `1px solid #3182ce`,
            outlineOffset: `2px`,
            paddingBottom: `10px`
          }}
          id={name}
          {...rest}
        />
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
