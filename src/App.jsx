import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './pages/Hero.jsx';
import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dasboard.jsx';
import Profile from './pages/Profile.jsx';
import Transfer from './pages/Transfer.jsx';
import Success from './pages/Success.jsx';
import Bankcard from './pages/Bankcard.jsx';
import Security from './pages/Security.jsx';
import AccountLimit from './pages/AccountLimits.jsx';
import Finance from './pages/Finance.jsx';
import Loader from './pages/Loader.jsx';
import Paybill from './pages/Paybill.jsx';
import ThemeContext from './ThemeContext.js';


function App() {
  // Theme state is now global
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/transfer' element={<Transfer />} />
          <Route path='/success' element={<Success />} />
          <Route path='/bankcard' element={<Bankcard />} />
          <Route path='/security' element={<Security />} />
          <Route path='/AccountLimits' element={<AccountLimit />} />
          <Route path='/finance' element={<Finance/>}/>
          <Route path='/paybill' element={<Paybill/>}/>
        </Routes>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App
