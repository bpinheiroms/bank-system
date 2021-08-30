import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import { publicFetch } from "../helpers/fetch";
import { notifyMessage } from "../helpers/notification";

export const useGetDepositsControl = (itemSelected) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);

    const get = async () => {
      try {
        const response = await publicFetch.get(`api/deposit-control`);
        setData(response.data);
      } catch (err) {
        notifyMessage(true, err.response.data.message);
      }

      setLoading(false);
    };

    get();
  }, [status, itemSelected]);

  return { loading, data };
};
