import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllBlogs } from '../slices/blogsSlice';
import Paper from '@mui/material/Paper';

import { Box } from '@mui/material';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        '&>* + *': { marginTop: '12px' },
      }}
    >
      {blogs.map((blog) => (
        <Paper
          sx={{
            padding: '8px 16px',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#F2F2F2',
            },
          }}
          key={blog.id}
          onClick={() => {
            navigate(`/blogs/${blog.id}`);
          }}
        >
          {blog.title} {blog.author}
        </Paper>
      ))}
    </Box>
  );
};

export default Blogs;
