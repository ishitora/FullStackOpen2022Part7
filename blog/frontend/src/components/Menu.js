import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { userLogout } from '../slices/authSlice';
import Button from './Button';

const Menu = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state?.auth?.user);
  const logout = () => {
    dispatch(userLogout());
  };
  console.log(location.pathname);
  return (
    <Box
      sx={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }}
    >
      <Box
        sx={{
          flex: '0 0 250px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          '&>span': {
            color: 'primary.dark',
            fontWeight: 700,
            fontSize: '24px',
          },
          '&>a': {
            textDecoration: 'none',
            color: 'primary.main',
            fontWeight: 700,
          },
        }}
      >
        <span>blogs</span>
        <Link
          style={location.pathname === '/' ? { color: '#99d066' } : {}}
          to="/"
        >
          blogs
        </Link>
        <Link
          style={location.pathname === '/users' ? { color: '#99d066' } : {}}
          to="/users"
        >
          users
        </Link>
      </Box>
      <Box
        sx={{
          '&>span': {
            color: 'primary.dark',
          },
        }}
      >
        <span>{user.name}</span> logged in
        <Button onClick={logout} sx={{ marginLeft: '10px' }}>
          logout
        </Button>
      </Box>
    </Box>
  );
};

export default Menu;
