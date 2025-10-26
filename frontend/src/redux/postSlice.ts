import type { Post } from "@/types/post";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";



interface PostState {
  posts: Post[];
  selectedPost: Post | null;
}

const initialState: PostState = {
  posts: [],
  selectedPost: null,
};


const postSlice = createSlice({
  name: "post",
 initialState,

  reducers: {
    // actions
    setPosts: (state, action: PayloadAction<Post[] | []>) => {
      state.posts = action.payload;
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { setPosts, setSelectedPost } = postSlice.actions;
export default postSlice.reducer;
