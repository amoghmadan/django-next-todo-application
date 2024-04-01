import { Dispatch, SetStateAction } from "react";

export interface PaginatedData<Entity> {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<Entity>;
}

export interface PaginatedFilter {
  limit: number;
  offset?: number;
}

export interface PaginatedHook<Entity, Filter> {
  data: PaginatedData<Entity>;
  loading: boolean;
  filters: Filter;
  setFilters: Dispatch<SetStateAction<Filter>>;
}
