import React, { useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneUser } from '../slices/usersSlice';

import { Box, Paper } from '@mui/material';

const User = () => {
  const match = useMatch('/users/:id');
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.user);
  useEffect(() => {
    dispatch(getOneUser(match.params.id));
  }, []);

  if (!user) {
    return null;
  }

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
        '&>h3': {
          fontSize: '24px',
          fontWeight: 6000,
          '&>span': { color: 'primary.dark' },
        },
        '&>h4': { fontSize: '20px', fontWeight: 6000 },
      }}
    >
      <h3>
        user:<span>{user.name}</span>
      </h3>
      <h4>added blogs:</h4>

      {user.blogs.map((blog) => (
        <Paper
          key={blog.id}
          sx={{
            padding: '8px 16px',
          }}
        >
          {blog.title}
        </Paper>
      ))}
      {user.blogs.length === 0 && <li>no blog</li>}
    </Box>
  );
};

export default User;
