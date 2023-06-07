import Axios from "axios";
import { setupInterceptorsTo } from "./interceptors";

const api = setupInterceptorsTo(
  Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10 * 1000, // milliseconds
    headers: { "Content-Type": "application/json" },
  })
);

export default api;
