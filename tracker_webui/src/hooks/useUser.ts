import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  CancelTokenSource,
} from "axios";
import { useEffect, useState } from "react";

import { API } from "@/config";
import { User } from "@/interfaces/entities";
import { api } from "@/services/axios";

export default function useUser(): { user: User; loading: boolean } {
  const [user, setUser] = useState<User>(null!);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect((): (() => void) => {
    const source: CancelTokenSource = axios.CancelToken.source();
    const config: AxiosRequestConfig = { cancelToken: source.token };

    const apiCall = async (): Promise<void> => {
      try {
        const repsonse: AxiosResponse = await api.get(API.ACCOUNT_DETAIL);
        const data: User = await repsonse.data;
        setUser(data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request cancelled", err.message);
        } else {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };
    apiCall();

    return (): void => {
      source.cancel("Request cancelled by the user.");
    };
  }, []);

  return { user, loading };
}
