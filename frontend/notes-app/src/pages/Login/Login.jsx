import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import { validateEmail } from '../../utils/Helper';
import axiosInstance from '../../utils/axiosInstance';
import Navbar2 from '../../components/Navbar2/Navbar2';
import google from '../../assets/images/search.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
  
    if (!password) {
      setError('Please enter the password.');
      return;
    }
  
    setError('');
  
    try {
      const response = await axiosInstance.post('/login', { email, password });
      console.log("Login Response:", response.data); // Debugging: Log the response
  
      if (response.data && response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        console.log("Token stored in localStorage:", localStorage.getItem('accessToken')); // Debugging: Log the stored token
        navigate('/home');
      } else {
        console.log("Access token missing in response:", response.data); // Debugging: Log if token is missing
      }
    } catch (error) {
      console.error("Login Error:", error); // Debugging: Log any errors
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <>
      <Navbar2 />
      <main className="w-full h-screen flex flex-col items-center justify-center px-4 bg-gray-900 text-gray-100">
        <div className="max-w-sm w-full space-y-5">
          <div className="text-center pb-8">
            <img
              
            />
            <div className="mt-5">
              <h3 className="text-2xl font-bold sm:text-3xl">Login</h3>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-1"
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-1"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-x-3">
                <input
                  type="checkbox"
                  id="remember-me-checkbox"
                  className="rounded border border-gray-700 bg-gray-800 focus:ring-indigo-600 text-indigo-600 h-4 w-4"
                />
                <label htmlFor="remember-me-checkbox" className="cursor-pointer text-gray-300">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-indigo-400 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg duration-150"
            >
              Sign in
            </button>
          </form>
          <button className="w-full flex items-center justify-center gap-x-3 py-2.5 border border-gray-700 bg-gray-800 rounded-lg text-sm font-medium text-gray-100 hover:bg-gray-700 duration-150 active:bg-gray-800">
            <img src={google} alt="" className="w-5 h-5" />
            Continue with Google
          </button>
          <p className="text-center text-gray-300">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-400 hover:text-indigo-500"> {/* Added Link component */}
              Register
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default Login;