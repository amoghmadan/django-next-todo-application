import { createSlice } from "@reduxjs/toolkit";

import { Action, State } from "./types";
import { User } from "@/interfaces/entities";
import { RootState } from "../types";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state: State, action: Action): void => {
      state.user = action.payload;
    },
    removeUser: (state: State, action: Action): void => {
      state.user = null;
    },
  },
});

export const getUser = (state: RootState): User | null => state.user.user;

export const { removeUser, setUser } = userSlice.actions;

export default userSlice.reducer;
