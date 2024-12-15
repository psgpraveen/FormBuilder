import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.post(`${apiUrl}/login`, { email, password });
      if (response.data?.message === 'Login successfully') {
        
        navigate('/lob', { state: { user: response.data.user } });
      } else {
        setErrorMessage(response.data?.message || 'Invalid credentials');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
<section className="min-h-screen flex items-center my-8 justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-700">
<div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg shadow-purple-400/50">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
          Welcome Back!
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
              required
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm text-center">
              {errorMessage}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-300"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
        
        
      </div>
    </section>
  );
};

export default Login;
