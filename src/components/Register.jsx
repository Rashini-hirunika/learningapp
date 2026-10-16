
import React, { useState } from 'react';
import { registerUser } from '../services/api';

export default function Register({ switchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    phone: '',
    nic: '',
    username: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccessMsg('');

    try {
      await registerUser(formData);
      setSuccessMsg('Registration successful! Redirecting to login...');
      setTimeout(() => {
        switchToLogin(); // Register වූ පසු ස්වයංක්‍රීයව Login පිටුවට මාරු වීම
      }, 1500);
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors);
      } else {
        alert(err.message || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        {successMsg && <div style={styles.successAlert}>{successMsg}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} style={styles.input} required />
            {errors.name && <span style={styles.errorText}>{errors.name[0]}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} required />
            {errors.email && <span style={styles.errorText}>{errors.email[0]}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Date of Birth (YYYY-MM-DD)</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} style={styles.input} required />
            {errors.dob && <span style={styles.errorText}>{errors.dob[0]}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone Number</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} style={styles.input} required />
            {errors.phone && <span style={styles.errorText}>{errors.phone[0]}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>NIC</label>
            <input type="text" name="nic" value={formData.nic} onChange={handleChange} style={styles.input} required />
            {errors.nic && <span style={styles.errorText}>{errors.nic[0]}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Username (Optional)</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} style={styles.input} required />
            {errors.password && <span style={styles.errorText}>{errors.password[0]}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} style={styles.input} required />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p style={styles.switchText}>
          Already have an account?{' '}
          <span onClick={switchToLogin} style={styles.link}>Login here</span>
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
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    padding: '20px 0'
  },
  card: { 
    background: '#ffffff', 
    padding: '30px', 
    borderRadius: '10px', 
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
    width: '100%', 
    maxWidth: '450px' 
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
  errorText: { 
    color: '#dc3545', 
    fontSize: '12px' 
  },
  successAlert: { 
    padding: '10px', 
    backgroundColor: '#d4edda', 
    color: '#155724', 
    borderRadius: '5px', 
    marginBottom: '15px', 
    textAlign: 'center', 
    fontSize: '14px' 
  }
};