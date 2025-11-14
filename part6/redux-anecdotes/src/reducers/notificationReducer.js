import { createSlice } from "@reduxjs/toolkit";

let timeoutId = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    set(state, action) {
      return action.payload;
    },
    clear() {
      return "";
    },
  },
});

export const { set, clear } = notificationSlice.actions;

export const setNotification = (text, seconds) => {
  return (dispatch) => {
    dispatch(set(text));

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      dispatch(clear());
      timeoutId = null;
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;
