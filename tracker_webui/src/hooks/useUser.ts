import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  CancelTokenSource,
} from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

import { API } from "@/config";
import { User } from "@/interfaces/entities";
import { getUser, setUser } from "@/redux/user";
import { api } from "@/services/axios";

export default function useUser(): { user: User | null; loading: boolean } {
  const dispatch: Dispatch = useDispatch();
  const user: User | null = useSelector(getUser);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect((): (() => void) => {
    const source: CancelTokenSource = axios.CancelToken.source();
    const config: AxiosRequestConfig = { cancelToken: source.token };

    const apiCall = async (): Promise<void> => {
      if (user) return;
      try {
        const repsonse: AxiosResponse = await api.get(
          API.ACCOUNT_DETAIL,
          config
        );
        const data: User = await repsonse.data;
        dispatch(setUser(data));
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
  }, [dispatch, user]);

  return { user, loading };
}
