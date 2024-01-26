import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: { accessToken: null, name: null },
  },
  reducers: {
    login(state, action) {
      console.log("login", action);

      state.isLoggedIn = true;
      localStorage.setItem("userId", action.payload.accessToken);
      state.user.accessToken = action.payload.accessToken;
      state.user.name = action.payload.name;
    },
    logout(state) {
      console.log("logout");
      localStorage.removeItem("userId");
      state.isLoggedIn = false;
      state.user.accessToken = null;
      state.user.name = null;
    },
    setUserName(state, action) {
      state.user.name = action.payload.name;
    },
  },
});

export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;
