import React, { useState, useEffect } from 'react';
import UserBar from '../../components/UserBar/UserBar';
import { PieChart } from '../../Graphs/Pie';
import TeamPic from "../../assets/images/teamprofile.png";
import TaskList from '../../components/List/TaskList'; // Import the TaskList component
import TeamMemberCard from '../../components/Cards/TeamMemberCard';
import AreaChart from '../../Graphs/Area';
import Chat from '../../components/Chat/Chat';
import axios from 'axios';

const Team = () => {
  const [teamDetails, setTeamDetails] = useState({
    name: '',
    points: 0,
    bio: '',
    link: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [teamId, setTeamId] = useState(null); // Add teamId state

  // Fetch team details on component mount
  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        console.log('Token:', token); // Debugging: Log the token
  
        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }
  
        const response = await axios.get('http://localhost:5000/get-team', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            _: Date.now(), // Cache-busting parameter
          },
        });
  
        console.log('Response:', response.data); // Debugging: Log the response
  
        if (response.data && response.data.team) {
          setTeamDetails(response.data.team);
          setTeamId(response.data.team._id); // Set teamId from the response
          console.log('Team ID in Team Component:', response.data.team._id); // Debugging: Log teamId
        } else {
          setError('Team data not found.');
        }
      } catch (err) {
        console.error('Error fetching team data:', err);
        setError('Failed to fetch team data');
      } finally {
        setLoading(false);
      }
    };
  
    fetchTeamDetails();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-[#1E1E1E] dark:bg-[#1E1E1E] min-h-screen pb-1 transition-colors duration-300">
      <UserBar />
      <br /><br /><br /><br />

      <div className="flex h-screen">
        {/* Left Section */}
        <div className="flex flex-col flex-[3] border-1">
          {/* Top Left Section */}
          <div className="flex flex-[1] ml-3 mr-3 border border-[#333] bg-[#212121] rounded-lg shadow-md">
            <div className="flex-[1.5] bg-[#212121]">
              <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-row gap-4 md:gap-8 lg:gap-12">
                  <img src={TeamPic} alt="Team Logo" className="w-24 h-24 rounded-full object-cover" />
                  <div className="flex flex-col">
                    <h3 className="text-lg font-medium text-white mb-2">Team:</h3>
                    <h1 className="text-2xl font-bold text-white mb-2">{teamDetails.name}</h1>
                    <div className="flex flex-row items-center mb-1">
                      <h3 className="mr-2 text-white">Country:</h3>
                      <span className="text-gray-400">Country Name</span>
                    </div>
                    <div className="flex flex-row items-center">
                      <h3 className="mr-2 text-white">Score:</h3>
                      <span className="text-emerald-400 font-medium">{teamDetails.points}</span>
                    </div>
                  </div>
                </div>

                {/* Team Bio Section */}
                <div className="w-[700px] prose text-white dark:prose-white">
                  <h2 className="text-xl font-semibold mb-2 text-white">Team Bio</h2>
                  <p>{teamDetails.bio}</p>
                </div>

                <div className="flex w-[670px] flex-row justify-between">
                  <h3 className="text-base font-medium text-white">Link:</h3>
                  <a href={teamDetails.link} className="text-sky-400 hover:underline">
                    {teamDetails.link}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex bg-[#212121] justify-center items-center border border-[#333] rounded-lg">
            <div className="flex-[1] bg-[#212121] px-7">
              <TeamMemberCard />
            </div>
          </div>
          <div className="flex-1 bg-[#212121] border border-[#333]">
            <TaskList teamId={teamId} /> {/* Pass teamId as a prop */}
          </div>
          <div>
            <div className="bg-[#1E1E1E] flex w-full pt-10 flex-row gap-20 justify-center items-center px-10 border-0 border-green">
              <div style={{ width: '300px', height: '300px' }}>
                <PieChart />
              </div>
              <div style={{ width: '30px', height: '300px' }}></div>
              <div style={{ width: '300px', height: '300px' }}>
                <PieChart />
                <br /><br />
              </div>
            </div>
            <div className="bg-[#1E1E1E] flex justify-center">
              <AreaChart />
            </div>
          </div>
        </div>
      </div>

      {/* Chat Component */}
      <Chat />
    </div>
  );
};

export default Team;