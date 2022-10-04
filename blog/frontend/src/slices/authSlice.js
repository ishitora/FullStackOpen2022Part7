import { createSlice } from '@reduxjs/toolkit';
import { notify } from '../slices/notificationSlice';

import loginService from '../services/login';
import userService from '../services/user';

const initialState = { login: false, user: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      return { login: true, user: action.payload };
    },
    logout() {
      return { login: false, user: null };
    },
  },
});

export const { login, logout } = authSlice.actions;

export const userLogin = (username, password) => {
  return async (dispatch) => {
    return loginService
      .login({
        username,
        password,
      })
      .then((user) => {
        dispatch(login(user));

        userService.setUser(user);

        dispatch(notify(`${user.name} logged in!`));
      })
      .catch(() => {
        dispatch(notify('wrong username/password', 'error'));
      });
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    dispatch(notify('goodbye'));
    dispatch(logout());
  };
};

export default authSlice.reducer;
