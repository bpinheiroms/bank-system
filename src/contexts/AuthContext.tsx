import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { FetchContext } from "./FetchContext";
import { privateFetch, publicFetch } from "../helpers/fetch";

const AuthContext = createContext(null);

interface UserInfo {
  _id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthState {
  expiresAt: number;
  userInfo: UserInfo;
}

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const authContext = useContext(FetchContext);

  const [authState, setAuthState] = useState<AuthState>();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await privateFetch(authContext).get("api/user");
        setAuthState({ ...authState, userInfo: data, expiresAt: data.exp });
      } catch (err) {
        setAuthState({ ...authState, userInfo: null });
      }
    };
    getUserInfo();
  }, []);

  const setAuthInfo = ({ userInfo, expiresAt }: AuthState) => {
    setAuthState({
      userInfo,
      expiresAt,
    });
  };

  const logout = async () => {
    try {
      await publicFetch.delete("api/logout");
      setAuthState({ ...authState, userInfo: null });
    } catch (err) {
      return err;
    }
  };

  const isAuthenticated = () => {
    if (!authState.expiresAt) {
      return false;
    }
    return new Date().getTime() / 1000 < authState.expiresAt;
  };

  const isAdmin = () => {
    return authState?.userInfo?.role === "admin";
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
