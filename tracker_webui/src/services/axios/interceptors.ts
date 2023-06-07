import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { Browser, LOCAL_STORAGE_KEY } from "../../constants";

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig<any> => {
  const token: string | null = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  if (JSON.parse(process.env.NEXT_PUBLIC_DEBUG || "false")) {
    console.info(`[request] [${JSON.stringify(config)}]`);
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  if (JSON.parse(process.env.NEXT_PUBLIC_DEBUG || "false")) {
    console.error(`[request error] [${JSON.stringify(error)}]`);
  }
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  if (JSON.parse(process.env.NEXT_PUBLIC_DEBUG || "false")) {
    console.info(`[response] [${JSON.stringify(response)}]`);
  }
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  if (error.message == "Network Error") {
    return Promise.reject(error.message);
  }
  try {
    switch (error.response?.status) {
      case 400:
        break;
      case 401:
        localStorage.clear();
        break;
      case 403:
        break;
      case 404:
        window.location.href = Browser.HTTP_404;
        break;
      case 500:
        break;
      case 504:
        break;
      default:
        return Promise.reject(error);
    }
  } catch (e: unknown) {
    if (JSON.parse(process.env.NEXT_PUBLIC_DEBUG || "false")) {
      console.error(`[response error] [${JSON.stringify(e)}]`);
    }
  }
  if (JSON.parse(process.env.NEXT_PUBLIC_DEBUG || "false")) {
    console.error(`[response error] [${JSON.stringify(error)}]`);
  }
  return Promise.reject(error.message);
};

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
