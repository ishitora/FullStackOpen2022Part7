import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users';
const initialState = { users: [], user: null };

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers(state, action) {
      return { ...state, users: action.payload };
    },
    getUser(state, action) {
      return { ...state, user: action.payload };
    },
  },
});

export const { getUsers, getUser } = usersSlice.actions;

export const getAllUsers = () => {
  return async (dispatch) => {
    usersService.getAll().then((users) => dispatch(getUsers(users)));
  };
};

export const getOneUser = (id) => {
  return async (dispatch) => {
    usersService.getOneUser(id).then((user) => dispatch(getUser(user)));
  };
};
export default usersSlice.reducer;
