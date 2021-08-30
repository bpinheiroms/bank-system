import { Stack } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { listMenu, listMenuAdmin } from "../../data";
import { NavLink } from "./NavLink";

export function SidebarNav() {
  const auth = useContext(AuthContext);

  return (
    <Stack spacing="12" align="flex-start">
      {auth.isAdmin() ? (
        <>
          {listMenuAdmin.map((menu, index) => (
            <NavLink key={index} icon={menu.icon} href={menu.href}>
              {menu.name}
            </NavLink>
          ))}
        </>
      ) : (
        <>
          {listMenu.map((menu, index) => (
            <NavLink key={index} icon={menu.icon} href={menu.href}>
              {menu.name}
            </NavLink>
          ))}
        </>
      )}
    </Stack>
  );
}
