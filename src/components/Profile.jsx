
import React, { useEffect, useState } from 'react';
import { getProfile, updateProfile, logoutUser } from '../services/api';

export default function Profile({ onLogout }) {
  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchUserData() {
      try {
        const data = await getProfile(token);
        setUser(data);
        setNewName(data.name);
      } catch (err) {
        handleLogout();
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = await updateProfile(token, newName);
      setUser(data.user);
      setIsEditing(false);
      alert(data.message || 'Profile updated successfully!');
    } catch (err) {
      alert(err.message || 'Failed to update profile.');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser(token);
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem('token'); 
      onLogout();
    }
  };

  if (loading) {
    return <div style={styles.container}>Loading profile...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.avatarContainer}>
          <div style={styles.avatar}>👤</div>
          <h2 style={styles.title}>User Profile</h2>
        </div>

        {user && (
          <div>
            <div style={styles.profileInfo}>
              <div style={styles.infoRow}><strong>Name:</strong> <span>{user.name}</span></div>
              <div style={styles.infoRow}><strong>Username:</strong> <span>{user.username}</span></div>
              <div style={styles.infoRow}><strong>Email:</strong> <span>{user.email}</span></div>
              <div style={styles.infoRow}>
                <strong>DOB:</strong> 
                <span>{user.dob ? user.dob.split('T')[0] : ''}</span>
              </div>
              <div style={styles.infoRow}><strong>Phone:</strong> <span>{user.phone}</span></div>
              <div style={styles.infoRow}><strong>NIC:</strong> <span>{user.nic}</span></div>
            </div>

            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} style={styles.secondaryButton}>
                 Edit Name
              </button>
            ) : (
              <form onSubmit={handleUpdate} style={{ marginTop: '15px' }}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>New Name</label>
                  <input 
                    type="text" 
                    value={newName} 
                    onChange={(e) => setNewName(e.target.value)} 
                    style={styles.input} 
                    required 
                  />
                </div>
                <div style={styles.buttonGroup}>
                  <button type="submit" style={styles.button}>Save</button>
                  <button type="button" onClick={() => setIsEditing(false)} style={styles.cancelButton}>Cancel</button>
                </div>
              </form>
            )}

            <button onClick={handleLogout} style={styles.logoutButton}>
               Logout
            </button>
          </div>
        )}
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
    padding: '20px'
  },
  card: { 
    background: '#ffffff', 
    padding: '30px', 
    borderRadius: '10px', 
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
    width: '100%', 
    maxWidth: '450px' 
  },
  avatarContainer: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  avatar: {
    fontSize: '40px',
    backgroundColor: '#e9ecef',
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 10px auto'
  },
  title: { 
    color: '#333',
    fontSize: '22px',
    margin: '0'
  },
  profileInfo: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '10px', 
    fontSize: '14px', 
    color: '#333', 
    background: '#f9f9f9', 
    padding: '15px', 
    borderRadius: '8px',
    border: '1px solid #eee'
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #eee',
    paddingBottom: '5px'
  },
  inputGroup: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '5px',
    marginBottom: '10px'
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
  buttonGroup: {
    display: 'flex',
    gap: '10px'
  },
  button: { 
    flex: 1,
    padding: '10px', 
    backgroundColor: '#007bff', 
    color: 'white', 
    border: 'none', 
    borderRadius: '5px', 
    fontSize: '14px', 
    cursor: 'pointer', 
    fontWeight: 'bold' 
  },
  secondaryButton: { 
    padding: '10px 15px', 
    backgroundColor: '#6c757d', 
    color: 'white', 
    border: 'none', 
    borderRadius: '5px', 
    cursor: 'pointer', 
    width: '100%', 
    marginTop: '15px',
    fontWeight: '600'
  },
  cancelButton: { 
    flex: 1,
    padding: '10px', 
    backgroundColor: '#6c757d', 
    color: 'white', 
    border: 'none', 
    borderRadius: '5px', 
    fontSize: '14px', 
    cursor: 'pointer' 
  },
  logoutButton: { 
    padding: '12px', 
    backgroundColor: '#dc3545', 
    color: 'white', 
    border: 'none', 
    borderRadius: '5px', 
    fontSize: '15px', 
    cursor: 'pointer', 
    width: '100%', 
    marginTop: '15px', 
    fontWeight: 'bold' 
  }
};