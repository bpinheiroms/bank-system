import { Box, Flex, Heading, Icon, IconButton } from "@chakra-ui/react";
import React, { useContext } from "react";
import { RiMenuLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { Sidebar } from "../Sidebar";
import { AuthContext } from "../../contexts/AuthContext";
import { useRouter } from "next/router";

interface IParams {
  title: string;
}

const HeaderWithAccess: React.FC<IParams> = ({ title }) => {
  const { onOpen } = useSidebarDrawer();

  const auth = useContext(AuthContext);
  const router = useRouter();

  const deslogar = () => {
    auth.logout();
    router.push("/signin");
  };

  return (
    <Flex pt="8" pb="8" bgColor="blue.200" as="header" w="100%">
      <Sidebar />
      <Flex align="center" justify="center" w="50px">
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          color="white"
          onClick={onOpen}
          mr="2"
          ml="8"
        ></IconButton>
      </Flex>

      <Flex align="center" justify="center" flex="1">
        <Heading color="white" size="md">
          {title}
        </Heading>
      </Flex>

      <Flex align="center" justify="center" w="50px">
        <IconButton
          aria-label="Logout"
          icon={<Icon as={BiLogOut} />}
          fontSize="24"
          variant="unstyled"
          color="white"
          onClick={deslogar}
          mr="8"
        ></IconButton>
      </Flex>
    </Flex>
  );
};

export default HeaderWithAccess;
