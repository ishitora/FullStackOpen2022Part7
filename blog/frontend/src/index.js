import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createRoot } from 'react-dom/client';
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles';
import App from './App';
import notificationReducer from './slices/notificationSlice';
import blogsReducer from './slices/blogsSlice';
import authReducer from './slices/authSlice';
import usersReducer from './slices/usersSlice';
import './style.css';
const theme = createTheme({
  palette: {
    primary: {
      main: '#689f38',
      light: '#99d066',
      dark: '#387002',
    },
  },
});

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    auth: authReducer,
    users: usersReducer,
  },
});

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <StyledEngineProvider injectFirst>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App tab="home" />
      </ThemeProvider>
    </Provider>
  </StyledEngineProvider>
);
