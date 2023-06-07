import { ItemFilter, PaginatedItemList } from "@/interfaces/item";

export interface IContext {
  itemList: PaginatedItemList;
  loading: boolean;
  filters: ItemFilter;
  setFilters: Function;
}
