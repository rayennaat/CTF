import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/Helper';
import axiosInstance from '../../utils/axiosInstance';
import Navbar2 from '../../components/Navbar2/Navbar2';
import google from '../../assets/images/search.png';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [teamChoice, setTeamChoice] = useState('join');
  const [teamName, setTeamName] = useState('');
  const [teamPassword, setTeamPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try{
      if (!name) {
      setError('Please enter your name.');
      return;
    }
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
      const response = await axiosInstance.post('/create-account', {
        fullName: name,
        email: email,
        password: password,
        teamChoice,
        teamName: teamChoice === 'create' ? teamName : undefined,
        teamPassword: teamChoice === 'create' || teamChoice === 'join' ? teamPassword : undefined,
      });

      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }
      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/home');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  }finally{
      setIsLoading(false);
    }
    
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar2 />
      <main className="w-full flex-grow flex flex-col items-center justify-center px-4 pt-20">
        <div className="max-w-sm w-full text-gray-600 space-y-5 flex-shrink-0">
          <div className="text-center pb-8">
            <img />
            <div className="mt-5">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Sign Up
              </h3>
            </div>
          </div>
          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div className="mt-5">
              <p className="font-medium"></p>
              <div className="flex space-x-4 mt-3">
                <button
                  type="button"
                  onClick={() => {
                    setTeamChoice('join');
                    setTeamName('');
                    setTeamPassword('');
                  }}
                  className={`w-full px-4 py-2 text-white font-medium rounded-lg duration-150 ${
                    teamChoice === 'join' ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                >
                  Join Team
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTeamChoice('create');
                    setTeamName('');
                    setTeamPassword('');
                  }}
                  className={`w-full px-4 py-2 text-white font-medium rounded-lg duration-150 ${
                    teamChoice === 'create' ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                >
                  Create Team
                </button>
              </div>
              {teamChoice === 'join' && (
                <div className="mt-5">
                  <label className="font-medium">Enter Team's Password</label>
                  <input
                    type="password"
                    value={teamPassword}
                    onChange={(e) => setTeamPassword(e.target.value)}
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
              )}
              {teamChoice === 'create' && (
                <>
                  <div className="mt-5">
                    <label className="font-medium">Team Name</label>
                    <input
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                  </div>
                  <div className="mt-5">
                    <label className="font-medium">Team Password</label>
                    <input
                      type="password"
                      value={teamPassword}
                      onChange={(e) => setTeamPassword(e.target.value)}
                      className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                  </div>
                </>
              )}
            </div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-4 py-2 font-medium text-white ${isLoading ? 'bg-gray-400' : 'bg-indigo-600'} rounded-lg`}
            >
              {isLoading ? 'Creating...' : 'Create an Account'}
            </button>
          </form>
          <button className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100">
            <img src={google} alt="" className="w-5 h-5" />
            Continue with Google
          </button>
          <p className="text-center">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
