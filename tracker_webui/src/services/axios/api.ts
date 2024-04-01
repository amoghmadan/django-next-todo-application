import axios from "axios";
import { setupInterceptorsTo } from "./interceptors";

const api = setupInterceptorsTo(
  axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_ROOT_URL}api/v1/`,
    timeout: 10 * 1000, // milliseconds
    headers: { "Content-Type": "application/json" },
  })
);

export default api;
