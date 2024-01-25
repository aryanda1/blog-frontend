import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, user: { accessToken: null, blogs: [] } },
  reducers: {
    login(state, action) {
      console.log("login", action);

      state.isLoggedIn = true;
      localStorage.setItem("userId", action.payload.accessToken);
      state.user.accessToken = action.payload.accessToken;
    },
    logout(state) {
      console.log("logout");

      localStorage.removeItem("userId");
      state.isLoggedIn = false;
      state.user.accessToken = null;
      state.user.blogs = [];
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});
