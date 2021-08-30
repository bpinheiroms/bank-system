import axios from "axios";

const publicFetch = axios.create();

const privateFetch = (context) =>
  axios.create({
    headers:
      context &&
      context.req &&
      context.req.headers &&
      context.req.headers.cookie
        ? { cookie: context.req.headers.cookie }
        : undefined,
  });

export { publicFetch, privateFetch };
