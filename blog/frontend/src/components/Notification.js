import { useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const Notification = () => {
  const notification = useSelector((state) => state?.notification);

  return (
    <Snackbar
      open={notification ? true : false}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert severity={notification?.type || 'success'} sx={{ width: '100%' }}>
        {notification?.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
