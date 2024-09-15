import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Generator from './components/Generator';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Contact from './components/Contact';
import AskGymBro from './components/AskGymBro';
import TrackWorkout from './components/TrackWorkout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <AskGymBro />
            </>
          } />
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<SignupPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/trackworkout" element={<TrackWorkout />} />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;