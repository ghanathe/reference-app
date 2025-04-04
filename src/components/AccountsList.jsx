// src/AccountsList.jsx
import React from 'react';
import { 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Paper, 
  Box 
} from '@mui/material';

const AccountsList = ({ accounts }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Consented Accounts
      </Typography>
      {accounts.length === 0 ? (
        <Typography variant="body1">No accounts found.</Typography>
      ) : (
        <Paper elevation={1}>
          <List>
            {accounts.map((account, index) => (
              <ListItem key={index} divider>
                <ListItemText 
                  primary={account.accountType}
                  secondary={`Balance: ${account.availableCashBalance ? account.availableCashBalance : account.currentBalance ? account.currentBalance : account.principalBalance}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default AccountsList;