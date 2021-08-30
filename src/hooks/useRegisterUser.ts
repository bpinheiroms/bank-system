import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import { publicFetch } from "../helpers/fetch";
import { notifyMessage } from "../helpers/notification";

export const useRegisterUser = (userInfo) => {
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    setLoading(true);

    const register = async () => {
      try {
        const { data } = await publicFetch.post(`api/register`, userInfo);
        authContext.setAuthState(data);
        notifyMessage(false, data.message);
        router.push("/balance");
      } catch (err) {
        const { data } = err.response;
        notifyMessage(true, data.message);
      }

      setLoading(false);
    };

    if (userInfo) {
      register();
    } else {
      setLoading(false);
    }
  }, [userInfo]);

  return [loading];
};
