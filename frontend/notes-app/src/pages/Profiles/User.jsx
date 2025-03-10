import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserBar from '../../components/UserBar/UserBar';
import TeamPic from "../../assets/images/teamprofile.png";
import TasksSolved from '../../components/Tabels/TasksSolved';
import MyComponent from '../../Graphs/UserRadar';
import { PieChart } from '../../Graphs/Pie';
import AreaChart from '../../Graphs/Area';

const User = () => {
  const [fullName, setFullName] = useState(null);
  const [points, setPoints] = useState(null);
  const [team, setTeam] = useState(null); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null); // Add userId state


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        console.log('Token:', token); // Debugging: Log the token

        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5000/get-user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            _: Date.now(), // Cache-busting parameter
          },
        });

        console.log('Response:', response.data); // Debugging: Log the response

        if (response.data && response.data.user) {
          setFullName(response.data.user.fullName);
          setPoints(response.data.user.points);
          setTeam(response.data.user.team);
          setUserId(response.data.user._id); // Store userId  
          console.log('✅ User ID:', response.data.user._id); // Debugging: Log userId
        } else {
          setError('User data not found.');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="bg-[#1E1E1E] dark:bg-[#1E1E1E] min-h-screen pb-1 transition-colors duration-300">
      <UserBar />
      <br /><br /><br />
      <div className="flex flex-col">
        <div className="flex justify-between p-10">
          <div className="flex flex-row gap-4">
            <img src={TeamPic} alt="Team Logo" className="w-20 h-20 rounded-full object-cover" />
            <div className="flex flex-col">
              <h3 className="text-lg text-white font-medium mb-2">
                {loading ? 'Loading...' : fullName || 'User not found'}
              </h3>              
              <h3 className="mr-2 text-white ">Country: Tunisia</h3>          
              <h3 className="mr-2 text-white">Score: {loading ? "Loading..." : points || "0"}</h3>
            </div>                                    
          </div>
          <div className="flex flex-col justify-center">
            <h3 className='text-white '>Team :</h3>
            <h1 className="text-green-600">{team}</h1>
          </div>
        </div>

        <div className="px-10 border border-[#333]">
          <TasksSolved userId={userId}/>
          
        </div><br />
        
        <div className="flex flex-col">
          <div className="w-full max-w-7xl flex flex-row justify-center">
            <div className="w-[800px] h-[400px]">
              <MyComponent />
            </div>
            <div className="w-[400px] h-[500px]">
              <br /><PieChart />
            </div>
          </div> 
          <div className="flex justify-center">
            <AreaChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;