import type { User } from "@/types/user";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setAuthUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    clearUser: (state) => {
        state.user = null;
      state.isAuthenticated = false;
    }
    
  },
});

export const { setAuthUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
