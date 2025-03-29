// src/AccountsList.jsx
import React from 'react';

const AccountsList = ({accounts}) => {
 
  return (
    <div>
      <h2>Consented Accounts</h2>
      {accounts.length === 0 ? (
        <p>No accounts found.</p>
      ) : (
        <ul>
          {accounts.map((account, index) => (
            <li key={index}>
              {account.accountType} — Balance: {account.currentBalance} 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AccountsList;
