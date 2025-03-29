// src/OAuthCallback.jsx
import React, { useEffect } from 'react';

const OAuthCallback = () => {
  useEffect(() => {
    // Notify the main window that the OAuth flow is complete.
    if (window.opener) {
      window.opener.postMessage({ type: 'OAUTH_COMPLETE' }, window.location.origin);
    }
    // Close the popup window.
    window.close();
  }, []);

  return (
    <div>
      <h1>Completing OAuth Login...</h1>
      <p>Please wait while we finalize your authentication.</p>
    </div>
  );
};

export default OAuthCallback;
