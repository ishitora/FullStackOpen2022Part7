import React from 'react';
import Button from '@mui/material/Button';
const styledButton = ({ variant, sx, children, ...rest }) => {
  return (
    <Button
      sx={[
        variant === 'contained'
          ? {
              backgroundColor: 'primary.main',
              color: '#FFF',
              border: '1px solid',
              borderColor: 'primary.main',
            }
          : {
              backgroundColor: '#FFF',
              color: 'primary.main',
              border: '1px solid',
              borderColor: 'primary.main',

              '&:hover': {
                backgroundColor: 'primary.light',
              },
            },
        { padding: '3px 10px', transition: 'all 0.5s' },
        sx,
      ]}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default styledButton;
