import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Button from './Button';
import TextField from '@mui/material/TextField';
const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username, password).then(() => {
      navigate('/');
    });
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        alignSelf: 'center',
        justifySelf: 'center',
        height: '400px',
        margin: 'auto',
        // padding: '10px',
        '&>h2': {
          backgroundColor: 'primary.main',
          padding: '16px',
          color: '#FFF',
        },
        '&>form': {
          flex: 1,
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '&>*': {
            marginTop: '20px',
          },
          '&>div': {
            display: 'flex',
            alignItems: 'center',
          },
        },
      }}
    >
      <h2>Log in to application</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id="username"
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            label="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="password"
            variant="outlined"
          />
        </div>
        <Button id="login-button" type="submit">
          login
        </Button>
      </form>
    </Paper>
  );
};

export default LoginForm;
