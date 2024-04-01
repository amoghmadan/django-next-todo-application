export interface CreateItem {
  text: string;
  status?: number;
}

export type UpdateItem = CreateItem;

export interface PartialUpdateItem {
  text?: string;
  status?: number;
}

export interface RetrieveItem {
  id: number;
  text: string;
  status: number;
  created: string;
  updated: string;
}
