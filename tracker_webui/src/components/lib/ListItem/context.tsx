import { createContext } from "react";

import { Props } from "./types";
import { PaginatedHook } from "@/interfaces/domain";
import { PaginatedItemFilter } from "@/interfaces/domain/filter";
import { RetrieveItem } from "@/interfaces/entities";
import { usePaginatedItems } from "@/hooks";

export const ListItemContext = createContext<
  PaginatedHook<RetrieveItem, PaginatedItemFilter>
>({
  data: { count: 0, next: null, previous: null, results: [] },
  loading: false,
  filters: {},
  setFilters: () => {},
});

export function ListItemProvider(props: Props): JSX.Element {
  const { data, loading, filters, setFilters } = usePaginatedItems();
  return (
    <ListItemContext.Provider
      value={{
        data,
        loading,
        filters,
        setFilters,
      }}
    >
      {props.children}
    </ListItemContext.Provider>
  );
}
