import React, { useState } from 'react';
import { register } from '../services/ExternalAPIAuthService';
const { useNavigate } = require('react-router-dom');

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await register({ name, email, password });
    if(response){
        alert(response.message);
        navigate('/login')
    }
  };

  return (
    <div className="flex justify-center items-center h-screen background-color:#060814">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-black">Create an account</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full mb-4 p-2 rounded border border-gray-300 text-black"
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
          <input
            className="w-full mb-4 p-2 rounded border border-gray-300 text-black"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            className="w-full mb-4 p-2 rounded border border-gray-300 text-black"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            type="submit"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className='text-black'>Already have an account?</p>
          <a href="/login" className="text-blue-500">Sign in</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
