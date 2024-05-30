// pages/_app.js
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/theme";
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from '../firebase.config';  // Ensure you export firebaseApp from firebaseConfig
import Login from './Login';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {!user ? <Login /> : <Component {...pageProps} />}
    </ThemeProvider>
  );
}

export default MyApp;
