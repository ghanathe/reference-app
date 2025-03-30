import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated for React 18+
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import customTheme from './themes/customTheme';
import App from './App';
import './index.css'; // Global styles

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
    <BrowserRouter>
      <ThemeProvider theme={customTheme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Auth0Provider>
);
