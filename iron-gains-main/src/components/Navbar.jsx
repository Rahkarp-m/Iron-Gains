import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <nav className="bg-slate-900 text-white p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <Link to="/contact" className="hover:text-blue-500">Contact</Link>
        <Link to="/trackworkout" className="hover:text-blue-500">Track My Workout</Link> {/* New link */}
        
      </div>

      <div className="flex space-x-4">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="px-4 py-2 border rounded">Logout</button>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 border rounded hover:bg-blue-500">Login</Link>
            <Link to="/signup" className="px-4 py-2 border rounded hover:bg-blue-500">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
