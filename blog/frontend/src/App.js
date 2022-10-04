/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';

import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Users from './components/Users';
import User from './components/User';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import Menu from './components/Menu';

import { userLogin } from './slices/authSlice';
import { createBlog } from './slices/blogsSlice';

const App = () => {
  const isLogin = useSelector((state) => state?.auth?.login);
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  const login = async (username, password) => {
    return dispatch(userLogin(username, password));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        minHeight: '100vh',
      }}
    >
      <BrowserRouter>
        {isLogin && <Menu />}
        <Notification />
        <Box sx={{ flex: 1, display: 'flex', height: 'auto' }}>
          <Routes>
            <Route path="/login" element={<LoginForm onLogin={login} />} />
            <Route
              path="/"
              element={
                isLogin ? (
                  <Box
                    sx={{
                      padding: '20px',
                      width: '100%',
                      maxWidth: '1200px',
                      margin: '0 auto',
                    }}
                  >
                    <Togglable buttonLabel="new note" ref={blogFormRef}>
                      <NewBlogForm onCreate={createBlog} />
                    </Togglable>
                    <Blogs />
                  </Box>
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="/blogs/:id"
              element={isLogin ? <Blog /> : <Navigate replace to="/login" />}
            />
            <Route
              path="/users"
              element={isLogin ? <Users /> : <Navigate replace to="/login" />}
            />
            <Route
              path="/users/:id"
              element={isLogin ? <User /> : <Navigate replace to="/login" />}
            />
          </Routes>
        </Box>
      </BrowserRouter>
    </Box>
  );
};

export default App;
