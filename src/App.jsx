// src/App.jsx
import React from 'react';
import Header from './components/Header';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import OAuthCallback from './components/OAuthCallback';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oauth-callback" element={<OAuthCallback />} />
        {/* Add other routes as needed */}
      </Routes>
    </div>
  );
};

export default App;
