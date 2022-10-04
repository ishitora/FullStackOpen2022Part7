import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../slices/usersSlice';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';

const Users = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1200px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        '&>* + *': { marginTop: '12px' },
      }}
    >
      <h2>Users</h2>
      {users.map((user) => (
        <Paper
          sx={{
            padding: '8px 16px',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#F2F2F2',
            },
          }}
          key={user.id}
        >
          <a
            onClick={() => {
              navigate(`/users/${user.id}`);
            }}
          >
            {user.username}
          </a>
          {user.blogs.length}
        </Paper>
      ))}
    </Box>
  );
};

export default Users;
