import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import React, { useContext } from "react";
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext";
import { AuthContext, AuthProvider } from "../contexts/AuthContext";
import { FetchProvider } from "../contexts/FetchContext";
import { appRoutes } from "../data";
import { useRouter } from "next/router";
import NotFoundPageRedirect from "./redirect";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BalanceProvider } from "../contexts/BalanceContext";

const AppRoutes = ({ component: Component, pageProps }) => {
  const auth = useContext(AuthContext);
  const router = useRouter();

  if (!auth.authState) {
    return <></>;
  }

  const page = appRoutes.filter((x) => x.path === router.pathname)[0];
  if (page) {
    if (
      (page.onlyAdmin && !auth.isAdmin()) ||
      (page.onlyLogged && !auth.isAuthenticated()) ||
      (page.onlyCustomer && auth.isAdmin())
    ) {
      return <NotFoundPageRedirect {...pageProps} />;
    }
  }

  return <Component {...pageProps} />;
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <BalanceProvider>
          <FetchProvider>
            <SidebarDrawerProvider>
              <AppRoutes component={Component} pageProps={pageProps} />
              <ToastContainer />
            </SidebarDrawerProvider>
          </FetchProvider>
        </BalanceProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
