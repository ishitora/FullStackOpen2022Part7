import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from './Button';

const NewBlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(onCreate({ title, author, url, likes: 0 }));
    setAuthor('');
    setTitle('');
    setUrl('');
  };

  return (
    <Box
      sx={{
        '&>h2': {
          fontSize: '20px',
          fontWeight: 600,
        },
        '& form': {
          padding: '20px 0',
          '&> * + *': {
            marginTop: '20px',
          },
        },
      }}
    >
      <h2>Create new</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="title"
            placeholder="title of the blog"
          />
        </div>
        <div>
          <TextField
            label="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id="author"
            placeholder="author of the blog"
          />
        </div>
        <div>
          <TextField
            label="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id="url"
            placeholder="url of the blog"
          />
        </div>
        <Button variant="contained" id="create-butto" type="submit">
          create
        </Button>
      </form>
    </Box>
  );
};

export default NewBlogForm;
