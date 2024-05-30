// pages/login.js
import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { firebaseApp } from '../firebase.config';  // Ensure you export firebaseApp from firebaseConfig
import { Button } from '@mui/material';

const Login = () => {
  const handleLogin = () => {
    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .catch((error) => {
        console.error("Login failed:", error.message);
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Button variant="contained" onClick={handleLogin}>Login with Google</Button>
    </div>
  );
};

export default Login;
