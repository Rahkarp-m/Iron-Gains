import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignupPage({ setIsAuthenticated }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const navigate = useNavigate();

  async function handleSignup() {
    if (password !== rePassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      // Log the signup data to check what's being sent to the backend
      console.log({ name, email, password });

      const res = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      navigate('/');
    } catch (err) {
      console.error('Signup failed', err.response ? err.response.data : err.message);
      alert('Signup failed');
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-950 text-white">
      <h2 className="text-3xl mb-4">Sign Up</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="mb-2 p-2 border rounded w-full max-w-md" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mb-2 p-2 border rounded w-full max-w-md" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="mb-2 p-2 border rounded w-full max-w-md" />
      <input type="password" value={rePassword} onChange={(e) => setRePassword(e.target.value)} placeholder="Re-enter Password" className="mb-4 p-2 border rounded w-full max-w-md" />
      <button onClick={handleSignup} className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </div>
  );
}
