import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    // Initial state for blog-related data
    userBlogs: null,
    globalBlogs: null,
  },
  reducers: {
    setUserBlogs(state, action) {
      state.userBlogs = action.payload.blogs;
    },
    addUserBlogs(state, action) {
      state.userBlogs = [action.payload.blog, ...state.userBlogs];
    },
    deleteUserBlogs(state, action) {
      state.userBlogs = state.userBlogs.filter(
        (blog) => blog._id !== action.payload.id
      );
    },
    updateUserBlogs(state, action) {
      const blogIdx = state.userBlogs.findIndex(
        (blog) => blog._id === action.payload.id
      );
      if (blogIdx !== -1)
        state.userBlogs[blogIdx] = {
          ...state.userBlogs[blogIdx],
          ...action.payload.blog,
        };
    },

    // Add other blog-related actions here
  },
});

export const blogActions = blogSlice.actions;
export const blogReducer = blogSlice.reducer;
