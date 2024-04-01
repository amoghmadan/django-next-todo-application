import { PaginatedFilter } from "./pagination";

export interface ItemFilter {
  order?: string;
  status?: number;
}

export type PaginatedItemFilter = PaginatedFilter | ItemFilter;
