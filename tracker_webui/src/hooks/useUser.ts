import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import { API } from "@/constants";
import { User } from "@/interfaces";
import { api } from "@/services/axios";

export default function useUser(): [User, boolean] {
  const [user, setUser] = useState<User>(Object());
  const [loading, setLoading] = useState<boolean>(true);

  const getUser = async (): Promise<void> => {
    const repsonse: AxiosResponse = await api.get(API.ACCOUNT_DETAIL);
    const data: User = await repsonse.data;
    setUser(data);
    setLoading(false);
  };

  useEffect((): void => {
    getUser();
  }, []);

  return [user, loading];
}
