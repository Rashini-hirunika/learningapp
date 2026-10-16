
const API_URL = import.meta.env.VITE_API_BASE_URL;

// Register API Call
export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) throw data;
  return data;
}

// Login API Call
export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (!response.ok) throw data;
  return data;
}

// View Profile API Call
export async function getProfile(token) {
  const response = await fetch(`${API_URL}/profile`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) throw data;
  return data;
}

// Update Profile API Call (Name only)
export async function updateProfile(token, name) {
  const response = await fetch(`${API_URL}/profile`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  const data = await response.json();
  if (!response.ok) throw data;
  return data;
}

// Logout API Call
export async function logoutUser(token) {
  const response = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) throw data;
  return data;
}