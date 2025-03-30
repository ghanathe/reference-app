import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect(); // Redirects to Auth0 login page
  };

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin, // Redirects to home page after logout
      },
    });
  };

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #00695C, #00897B)' }}>
      <Toolbar>
        {/* Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Reference App
        </Typography>

        {/* Auth Buttons */}
        <Box>
          {isAuthenticated ? (
            <Button
              variant="contained"
              color="secondary" // Neon purple from theme
              onClick={handleLogout}
              sx={{ borderRadius: '12px', ml: 1 }}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary" // Teal from theme
              onClick={handleLogin}
              sx={{ borderRadius: '12px', ml: 1 }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;