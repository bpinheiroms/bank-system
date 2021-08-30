import { useEffect, useState } from "react";
import { publicFetch } from "../helpers/fetch";
import { notifyMessage } from "../helpers/notification";

export const useDepositStatus = (deposit) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);

    const post = async () => {
      try {
        await publicFetch.put(`api/deposit-control`, deposit);
        notifyMessage(false, `Operation performed successfully.`);
        setSuccess(true);
      } catch (err) {
        const { data } = err.response;
        notifyMessage(true, data.message);
      }

      setLoading(false);
    };

    if (deposit) {
      post();
    } else {
      setLoading(false);
    }
  }, [deposit]);

  return { loading, success };
};
