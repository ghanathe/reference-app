import React from 'react';
import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Button
      variant="contained"
      color="secondary" // Uses the neon purple
      onClick={handleLogout}
      sx={{ margin: '10px' }} // Optional spacing
    >
      Logout
    </Button>
  );
};

export default LogoutButton;