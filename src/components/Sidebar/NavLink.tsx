import React, { ElementType } from "react";
import {
  Icon,
  Text,
  LinkProps as ChakraLinkProps,
  Link,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({ icon, children, href }: NavLinkProps) {
  const router = useRouter();

  const onNavigation = () => {
    router.push(href);
  };
  return (
    <Button
      color="white"
      display="flex"
      bg="blue.400"
      align="center"
      type="button"
      onClick={onNavigation}
      _hover={{
        bgColor: "blue.400"
      }}
    >
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">
        {children}
      </Text>
    </Button>
  );
}
