import { useState, useEffect } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { likeBlog, deleteBlog, commentBlog } from '../slices/blogsSlice';
import { Box, IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
//import InputAdornment from '@mui/material/InputAdornment';

import AddIcon from '@mui/icons-material/Add';
import Button from './Button';
const Blog = () => {
  const match = useMatch('/blogs/:id');
  const [newComment, setNewComment] = useState('');
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.auth.user);
  const blog = blogs?.find((b) => b.id === match.params.id);

  useEffect(() => {
    if (blog.length === 0) {
      navigate('/');
    }
  }, [blogs]);

  if (!blog) {
    return null;
  }

  const own = blog.user && user.username === blog.user.username;

  const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous';

  const handleDelete = () => {
    dispatch(deleteBlog(blog.id)).then(() => {
      navigate('/');
    });
  };

  const handleAddComment = () => {
    dispatch(commentBlog(blog.id, newComment));
  };

  return (
    <Box
      sx={{
        padding: '20px',
        '&>h2': {
          fontSize: '30px',
        },
        '&> * + *': {
          marginTop: '12px',
        },
      }}
    >
      <h2>{blog.title}</h2>
      <div>
        url:<a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <Button
          onClick={() => {
            dispatch(likeBlog(blog.id));
          }}
        >
          like
        </Button>
      </div>
      <Box
        sx={{
          '&>span': {
            marginRight: '15px',
            '&>span': {
              color: 'primary.dark',
            },
          },
        }}
      >
        <span>
          addedBy <span>{addedBy}</span>
        </span>
        {own && <Button onClick={handleDelete}>remove</Button>}
      </Box>

      <Box
        sx={{
          '&>h3': {
            fontSize: '20px',
          },
          '&> * + *': {
            marginTop: '12px',
          },
        }}
      >
        <h3>comments</h3>
        <div>
          <TextField
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
            placeholder="add new comment"
            sx={{
              backgroundColor: '#fefefe',
              height: '40px',
              '& input': { height: '40px', boxSizing: 'border-box' },
            }}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <AddIcon onClick={handleAddComment} />
                </IconButton>
              ),
            }}
          />
        </div>

        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default Blog;
