import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Typography, Container, Card, CardContent, Box, Grid, Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountsList from './AccountsList'; // Assuming you have this component

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

const Home = () => {
    const { isAuthenticated, user, isLoading, getAccessTokenSilently } = useAuth0();
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

    if (isLoading) {
        return (
            <Container sx={{ textAlign: 'center', mt: 5 }}>
                <Typography variant="h6" color="text.primary">
                    Loading...
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Card sx={{ backgroundColor: 'background.paper', p: 3 }}>
                <CardContent>
                    <Typography variant="h2" gutterBottom align="center">
                        Welcome to Reference App
                    </Typography>

                    {isAuthenticated ? (
                        <Box>
                            <Typography variant="h5" color="text.primary" align="center">
                                Hello, {user.name || user.email}!
                            </Typography>
                            <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 2 }}>
                                You’re logged in and ready to explore. Enjoy the futuristic vibes!
                            </Typography>
                            <Box>
                                <Grid container spacing={2}>
                                    <Grid size={4}>
                                        <Stack spacing={2}>
                                            <Item>
                                                <button onClick={handleAtpDirectIntegrationFlow}>
                                                    Pay by Bank via Direct Integration
                                                </button>
                                            </Item>
                                            <Item>
                                                <button onClick={handleAtpAccountManagementFlow}>
                                                    Pay by Bank via Account Management
                                                </button>
                                            </Item>

                                        </Stack>
                                    </Grid>
                                    <Grid size={8}>
                                        <Item sx={{ height: '100%', boxSizing: 'border-box' }}>
                                            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                                            <AccountsList accounts={accounts} />
                                        </Item>
                                    </Grid>
                                </Grid>

                            </Box>


                        </Box>
                    ) : (
                        <Typography variant="body1" color="text.secondary" align="center">
                            Please log in to unlock the full experience of this app.
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default Home;