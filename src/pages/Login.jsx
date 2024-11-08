import axios from 'axios';
import { useState } from 'react';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://job-tracker-backend-x.vercel.app/api/auth/login', formData);
      const { access_token, refresh_token } = res.data;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      console.log('Login successful');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
    }
  };

  const handleGoogleLogin = async() => {
    window.location.href = 'https://job-tracker-backend-x.vercel.app/api/auth/google';
  };

  const handleGithubLogin = () => {
    window.location.href = 'https://job-tracker-backend-x.vercel.app/api/auth/github';
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors mb-4"
        >
          Login
        </button>
      </form>

      <div className="flex flex-col space-y-3">
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Login with Google
        </button>
        <button
          onClick={handleGithubLogin}
          className="w-full bg-gray-800 text-white font-semibold py-2 rounded-md hover:bg-gray-900 transition-colors"
        >
          Login with GitHub
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
