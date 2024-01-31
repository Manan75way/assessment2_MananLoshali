import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface UserState {
  name: string;
  email: string;
  token: string;
  id: string;
  type: string;
}

const initialState: UserState = {
  name: "",
  email: "",
  token: "",
  id: "",
  type: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
      return state;
    },
    deleteUser: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const { setUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
