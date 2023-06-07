export default interface Item {
  id?: number;
  text: string;
  status: number;
  created?: string;
  updated?: string;
}

export interface PaginatedItemList {
  count: number;
  results: Item[];
  next: null | string;
  previous: null | string;
}

export interface ItemFilter {
  limit: string;
  offset?: string;
  order: string;
  status?: number;
}
