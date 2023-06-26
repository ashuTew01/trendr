import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from 'scenes/homePage';   //relative written because of the jsconfig file
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from "@mui/material/styles";
import { themeSettings } from './theme';

// import './index.css';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);  
  //memoization. Caching the value so that everytime dark or light mode is clicked the 
  //entire theme need not be sent again and again.

  const isAuth = Boolean(useSelector((state) => state.token));    //CHANGE THIS LATER JUST A PLACEHOLDER!

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
        <CssBaseline />   {/* reset css for material ui */}
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/login" element={isAuth ? <Navigate to="/home" /> : <LoginPage />} />
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/login" /> } />
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" /> } />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
