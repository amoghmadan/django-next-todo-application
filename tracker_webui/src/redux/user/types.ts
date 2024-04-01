import { User } from "@/interfaces/entities";

export interface Action {
  type: string;
  payload: User | null;
}

export interface State {
  user: User | null;
}
