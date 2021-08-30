import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";

import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
  const { isOpen, onClose } = useSidebarDrawer();

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent bgColor="blue.400" p="4">
          <DrawerCloseButton mt="6" />
          <DrawerHeader
            bgColor="blue.200"
            position="absolute"
            width="100%"
            height="103"
            ml="-15px"
            mt="-15px"
          >
            <Flex height="100%" color="white" justify="center" align="center">
              <Heading color="white">
                BNB Bank
              </Heading>
            </Flex>
          </DrawerHeader>

          <DrawerBody mt="40">
            <SidebarNav />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
