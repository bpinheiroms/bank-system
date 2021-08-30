import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import { notifyMessage } from "../helpers/notification";
import { publicFetch } from "../helpers/fetch";

export const useLoginAuth = (userInfo) => {
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    setLoading(true);

    const authorize = async () => {
      try {
        const { data } = await publicFetch.post(`api/authenticate`, userInfo);
        authContext.setAuthState(data);
        notifyMessage(false, data.message);

        if (data.userInfo.role === "admin") {
          router.push("/check-control");
        } else {
          router.push("/balance");
        }
      } catch (err) {
        const { data } = err.response;
        notifyMessage(true, data.message);
      }

      setLoading(false);
    };

    if (userInfo) {
      authorize();
    } else {
      setLoading(false);
    }
  }, [userInfo]);

  return [loading];
};
