import { useRouter } from "next/router";
import React, { useEffect } from "react";

const NotFoundPageRedirect: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);
  return <div />;
};

export default NotFoundPageRedirect;
