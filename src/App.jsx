
import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [currentView, setCurrentView] = useState('login'); // 'login' or 'register'

  if (token) {
    return <Profile onLogout={() => setToken(null)} />;
  }

  return (
    <div>
      {currentView === 'login' ? (
        <Login 
          onLoginSuccess={(user) => setToken(localStorage.getItem('token'))} 
          switchToRegister={() => setCurrentView('register')} 
        />
      ) : (
        <Register 
          onRegisterSuccess={(user) => setToken(localStorage.getItem('token'))} 
          switchToLogin={() => setCurrentView('login')} 
        />
      )}
    </div>
  );
}