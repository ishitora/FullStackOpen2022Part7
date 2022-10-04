import { Box } from '@mui/material';
import { useState, useImperativeHandle, forwardRef } from 'react';
import Button from './Button';

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <Box sx={{ padding: '20px 0' }}>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} variant="contained">
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </Box>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;
