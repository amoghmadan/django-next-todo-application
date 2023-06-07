import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import { API, PAGE_SIZE } from "@/constants";

import { ItemFilter, PaginatedItemList } from "@/interfaces/item";
import { api } from "@/services/axios";

export default function useListItem(): [
  PaginatedItemList,
  boolean,
  ItemFilter,
  Function
] {
  const [itemList, setItemList] = useState<PaginatedItemList>(Object());
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<ItemFilter>({
    limit: PAGE_SIZE.toString(),
    order: "-created",
  });

  const getItemList = async (): Promise<void> => {
    const queryParams: URLSearchParams = new URLSearchParams();
    Object.entries(filters).forEach(
      (pair: [string, string | number | null]): void => {
        queryParams.append(pair[0], `${pair[1]}`);
      }
    );
    const response: AxiosResponse = await api.get(
      `${API.TASK_ITEM}?${queryParams.toString()}`
    );
    const data: PaginatedItemList = await response.data;
    setItemList(data);
    setLoading(false);
  };

  useEffect((): void => {
    getItemList();
  }, [filters]);

  return [itemList, loading, filters, setFilters];
}
