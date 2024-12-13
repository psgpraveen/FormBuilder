import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;
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
        localStorage.setItem('token',response.data.token)
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
    <section className="min-h-screen flex items-center justify-center my-12 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              placeholder='Enter Your Email'
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="***"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {errorMessage && (
            <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
          )}
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center">
          Don’t have an account? <Link to="/signup" className="text-blue-600">Sign up</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
