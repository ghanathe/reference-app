// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import OAuthCallback from './OAuthCallback';
import './index.css'; // if you have any global styles
import { ThemeProvider } from '@mui/material/styles';
import customTheme from './themes/customTheme'; // Import the new theme

const domain = 'dev-c2blv0uhxjwl7t1k.us.auth0.com'; // e.g., your-domain.auth0.com
const clientId = 'qutiSONbhiDs2lJWjR7jPdkf3FADSsfM';
const audience = 'https://reference-backend.example.com/api';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience,
      scope: "openid profile"
    }}
  >
    <Router>
    <ThemeProvider theme={customTheme}>
        
     
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/oauth-callback" element={<OAuthCallback />} />
      </Routes>
      </ThemeProvider>
    </Router>
  </Auth0Provider>
);
