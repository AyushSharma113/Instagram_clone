import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

interface LikeNotification {
  userId: string | number;
  type: "like" | "dislike";
  // You can add more fields if needed, e.g. postId, timestamp, etc.
}

interface RealTimeNotificationState {
  likeNotification: LikeNotification[];
}

const initialState: RealTimeNotificationState = {
  likeNotification: [],
};

const rtnSlice = createSlice({
  name: "realTimeNotification",
  initialState,
  reducers: {
    setLikeNotification: (state, action: PayloadAction<LikeNotification>) => {
      if (action.payload.type === "like") {
        state.likeNotification.push(action.payload);
      } else if (action.payload.type === "dislike") {
        state.likeNotification = state.likeNotification.filter(
          (item) => item.userId !== action.payload.userId
        );
      }
    },
  },
});

export const { setLikeNotification } = rtnSlice.actions;
export default rtnSlice.reducer;
