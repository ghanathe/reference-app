// src/App.jsx
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AccountsList from './AccountsList';

const App = () => {
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);
  const [popup, setPopup] = useState(null);

  // Audience for reference backend API
  const audience = "https://reference-backend.example.com/api";

  // Fetch magic URL for the Third Party OAuth flow.
  const fetchAtpDirectIntegrationUrl = async () => {
    try {
      // Retrieve an access token for the reference backend API.
      const token = await getAccessTokenSilently({ audience });
      // Build a redirect URL that the atp-server (or third party server) will redirect to after flow.
      const redirectUri = window.location.origin + '/oauth-callback';
      const encodedRedirectUri = encodeURIComponent(redirectUri);
      // Call the backend endpoint, including the token in the Authorization header.
      const response = await fetch(`http://reference-backend:9092/api/atp-direct-integration-url?redirect_uri=${encodedRedirectUri}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error("Failed to fetch third party OAuth URL");
      const data = await response.json();
      return data.directIntegrationUrl; // Expected response: { magicUrl: "https://..." }
    } catch (err) {
      console.error(err);
      setError(err.message);
      return null;
    }
  };

  // Fetch magic URL for the ATP (account management) flow.
  const fetchAtpAccountManagementUrl = async () => {
    try {
      const token = await getAccessTokenSilently({ audience });
      const redirectUrl = window.location.origin + '/oauth-callback';
      const encodedRedirectUrl = encodeURIComponent(redirectUrl);
      const response = await fetch(`http://reference-backend:9092/api/account-management-url?redirect_uri=${encodedRedirectUrl}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error("Failed to fetch ATP magic URL");
      const data = await response.json();
      return data.accountManagementUrl;
    } catch (err) {
      console.error(err);
      setError(err.message);
      return null;
    }
  };

  // Open a popup window with the given URL.
  const openPopup = (url) => {
    const width = 600;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const popupWindow = window.open(
      url,
      'magicPopup',
      `width=${width},height=${height},top=${top},left=${left}`
    );
    if (popupWindow) {
      setPopup(popupWindow);
    } else {
      setError("Popup blocked by browser");
    }
  };

  // Handler for the "Third Party OAuth Action" button.
  const handleAtpDirectIntegrationFlow = async () => {
    const url = await fetchAtpDirectIntegrationUrl();
    if (url) {
      openPopup(url);
    }
  };

  // Handler for the "Pay by Bank via Account Management" button.
  const handleAtpAccountManagementFlow = async () => {
    const url = await fetchAtpAccountManagementUrl();
    if (url) {
      openPopup(url);
    }
  };

  // Fetch accounts from the reference backend.
  const fetchAccounts = async () => {
    try {
      const token = await getAccessTokenSilently({ audience });
      const response = await fetch('/api/accounts', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch accounts');
      }
      const data = await response.json();
      setAccounts(data.accounts || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // Listen for postMessage events from the popup.
  useEffect(() => {
    const messageHandler = (event) => {
      // Optionally verify event.origin.
      if (event.data && event.data.type === 'OAUTH_COMPLETE') {
        if (popup && !popup.closed) {
          popup.close();
        }
        fetchAccounts();
      }
    };

    window.addEventListener('message', messageHandler);
    return () => window.removeEventListener('message', messageHandler);
  }, [popup]);

  return (
    <div>
      <h1>Reference App</h1>
      {isAuthenticated ? (
        <>
          <p>You are logged in.</p>
          <button onClick={handleAtpDirectIntegrationFlow}>
            Pay by Bank via Direct Integration
          </button>
          <button onClick={handleAtpAccountManagementFlow}>
            Pay by Bank via Account Management
          </button>
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          <AccountsList accounts={accounts} />
        </>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
    </div>
  );
};

export default App;
