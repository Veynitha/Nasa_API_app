import React, { useState } from 'react';
import { login } from '../services/ExternalAPIAuthService';
import { useNavigate } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = useSignIn();

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await login({ email, password });
    if (response) {
        try {
            signIn({
                auth: {
                    token: response.accessToken,
                    type: "Bearer"
                },
                userState: {
                    name: response.email,
                    uid: response.id
                }
            })  
        } catch (error) {
            console.error(error);    
        }
        navigate('/');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen background-color:#060814">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-6 text-black">Sign in to your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              className="w-full border rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              className="w-full border rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Sign In
          </button>
        </form>
        <div>
          <p className="mt-4 text-center text-gray-600">Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
