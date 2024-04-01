import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  CancelTokenSource,
} from "axios";
import { useEffect, useState } from "react";

import { API, PAGE_SIZE } from "@/config";
import {
  PaginatedData,
  PaginatedFilter,
  PaginatedHook,
} from "@/interfaces/domain";
import { ItemFilter } from "@/interfaces/domain/filter";
import { RetrieveItem } from "@/interfaces/entities";
import { api } from "@/services/axios";

function paginationHook<Entity, Filter>(
  url: string,
  initialFilters: Filter
): () => PaginatedHook<Entity, PaginatedFilter | Filter> {
  return function usePaginated(): PaginatedHook<
    Entity,
    PaginatedFilter | Filter
  > {
    const [data, setData] = useState<PaginatedData<Entity>>({
      count: 0,
      next: null,
      previous: null,
      results: [],
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [filters, setFilters] = useState<PaginatedFilter | Filter>({
      limit: PAGE_SIZE,
      ...initialFilters,
    });

    useEffect((): (() => void) => {
      const source: CancelTokenSource = axios.CancelToken.source();
      const config: AxiosRequestConfig = {
        cancelToken: source.token,
        params: filters,
      };

      const apiCall = async (): Promise<void> => {
        try {
          const response: AxiosResponse = await api.get(url, config);
          const responseData: PaginatedData<Entity> = await response.data;
          setData(responseData);
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
    }, [filters]);

    return { data, loading, filters, setFilters };
  };
}

export const usePaginatedItems = paginationHook<RetrieveItem, ItemFilter>(
  API.TASK_ITEM,
  { order: "-created" }
);
