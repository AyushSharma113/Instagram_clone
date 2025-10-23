import type { Post } from "@/types/post";
import { createSlice } from "@reduxjs/toolkit";



interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};


const postSlice = createSlice({
  name: "post",
 initialState,

  reducers: {
    // actions
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { setPosts } = postSlice.actions;
export default postSlice.reducer;
