
import React, { useState } from 'react';
import { loginUser } from '../services/api';

export default function Login({ onLoginSuccess, switchToRegister }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const data = await loginUser(credentials);
      localStorage.setItem('token', data.token); // Token churaña[cite: 1, 6]
      onLoginSuccess(data.user);
    } catch (err) {
      setErrorMsg(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        {errorMsg && <div style={styles.errorAlert}>{errorMsg}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username / Email / NIC</label>
            <input 
              type="text" 
              name="username" 
              value={credentials.username} 
              onChange={handleChange} 
              style={styles.input} 
              required 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              name="password" 
              value={credentials.password} 
              onChange={handleChange} 
              style={styles.input} 
              required 
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={styles.switchText}>
          Don't have an account?{' '}
          <span onClick={switchToRegister} style={styles.link}>Register here</span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh', 
    backgroundColor: '#f4f7f6', 
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' 
  },
  card: { 
    background: '#ffffff', 
    padding: '30px', 
    borderRadius: '10px', 
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
    width: '100%', 
    maxWidth: '420px' 
  },
  title: { 
    textAlign: 'center', 
    marginBottom: '20px', 
    color: '#333' 
  },
  form: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '15px' 
  },
  inputGroup: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '5px' 
  },
  label: { 
    fontSize: '14px', 
    fontWeight: '600', 
    color: '#555' 
  },
  input: { 
    padding: '10px', 
    borderRadius: '5px', 
    border: '1px solid #ccc', 
    fontSize: '14px', 
    outline: 'none' 
  },
  button: { 
    padding: '12px', 
    backgroundColor: '#007bff', 
    color: 'white', 
    border: 'none', 
    borderRadius: '5px', 
    fontSize: '16px', 
    cursor: 'pointer', 
    fontWeight: 'bold',
    marginTop: '10px'
  },
  switchText: { 
    textAlign: 'center', 
    marginTop: '15px', 
    fontSize: '14px', 
    color: '#666' 
  },
  link: { 
    color: '#007bff', 
    cursor: 'pointer', 
    fontWeight: '600' 
  },
  errorAlert: { 
    padding: '10px', 
    backgroundColor: '#f8d7da', 
    color: '#721c24', 
    borderRadius: '5px', 
    marginBottom: '15px', 
    textAlign: 'center', 
    fontSize: '14px' 
  }
};