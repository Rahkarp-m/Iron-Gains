import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      navigate('/');
    } catch (err) {
      alert('Invalid credentials');
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-950 text-white">
      <h2 className="text-3xl mb-4">Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mb-2 p-2 border rounded w-full max-w-md text-black" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="mb-4 p-2 border rounded w-full max-w-md text-black" />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </div>
  );
}
