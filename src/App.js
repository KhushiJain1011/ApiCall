import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => (
  <div className="text-center">
    <h1 className="text-4xl font-bold mb-6">Welcome to the App</h1>
    <div className="space-x-4">
      <Link to="/register">
        <button className="px-6 py-2 bg-blue-500 text-white rounded">Register</button>
      </Link>
      <Link to="/login">
        <button className="px-6 py-2 bg-green-500 text-white rounded">Login</button>
      </Link>
    </div>
  </div>
);

export default App;
