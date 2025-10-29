import type { User } from "@/types/user";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  suggestedUsers: string[]
  userProfile: User | null;
  selectedUser: User | null,
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  suggestedUsers:[],
  userProfile: null,
  selectedUser:null,
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
    },

     setUserProfile: (state, action: PayloadAction<User>) => {
      state.userProfile = action.payload;
    },

     setSelectedUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
    
  },
});

export const { setAuthUser, clearUser, setUserProfile, setSelectedUser } = authSlice.actions;
export default authSlice.reducer;
