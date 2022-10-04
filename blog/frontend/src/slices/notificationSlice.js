import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const notificationeSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displayNotification(state, action) {
      return action.payload;
    },
    closeNotification() {
      return null;
    },
  },
});

export const { displayNotification, closeNotification } =
  notificationeSlice.actions;

let timeout = null;

export const notify = (message, type = 'success', time = 5) => {
  return async (dispatch) => {
    dispatch(displayNotification({ message, type }));
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch(closeNotification());
    }, time * 1000);
  };
};

export default notificationeSlice.reducer;
