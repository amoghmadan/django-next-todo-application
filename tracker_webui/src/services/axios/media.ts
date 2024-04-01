import axios from "axios";
import { setupInterceptorsTo } from "./interceptors";

const media = setupInterceptorsTo(
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_ROOT_URL,
    timeout: 30 * 1000, // milliseconds
    headers: { "Content-Type": "application/json" },
  })
);

export default media;
