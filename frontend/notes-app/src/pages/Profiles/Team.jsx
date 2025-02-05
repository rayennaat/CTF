import React, { useState } from 'react';
import UserBar from '../../components/UserBar/UserBar';
import { PieChart } from '../../Graphs/Pie';
import TeamPic from "../../assets/images/teamprofile.png";
import TaskList from '../../components/List/TaskList';
import TeamMemberCard from '../../components/Cards/TeamMemberCard';
import AreaChart from '../../Graphs/Area';
import Chat from '../../components/Chat/Chat';

const Team = () => {
  const tasks = [
    { category: 'Web', challenge: 'Login Bypass' },
    { category: 'Crypto', challenge: 'RSA Decryption' },
    { category: 'Forensics', challenge: 'Image Analysis' },
    { category: 'Reverse Engineering', challenge: 'Binary Exploitation' },
    { category: 'Pwn', challenge: 'Stack Overflow' },
    { category: 'Web', challenge: 'XSS Vulnerability' },
    { category: 'Crypto', challenge: 'AES Encryption' },
    { category: 'Forensics', challenge: 'Network Traffic Analysis' },
    { category: 'Reverse Engineering', challenge: 'Code Decompilation' },
    { category: 'Pwn', challenge: 'Heap Overflow' },
    { category: 'Web', challenge: 'SQL Injection' },
    { category: 'Crypto', challenge: 'Hash Cracking' },
    { category: 'Forensics', challenge: 'Memory Forensics' },
    { category: 'Reverse Engineering', challenge: 'Debugging' },
    { category: 'Pwn', challenge: 'Format String Vulnerability' },
  ];

  return (
    <div className="bg-[#1E1E1E] dark:bg-[#1E1E1E] min-h-screen pb-1 transition-colors duration-300">
      <UserBar />
      <br /><br /><br /><br />

      <div className="flex h-screen  ">
        {/* Left Section */}
        <div className="flex flex-col flex-[3] border-1">
          {/* Top Left Section */}
          <div className="flex flex-[1] ml-3 mr-3 border border-[#333]  bg-[#212121] rounded-lg shadow-md"> {/* Added rounded corners, shadow, and dark background */}
            <div className="flex-[1.5] bg-[#212121]"> {/* Dark background for left section */}
              <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-row gap-4 md:gap-8 lg:gap-12">
                  <img src={TeamPic} alt="Team Logo" className="w-24 h-24 rounded-full object-cover" />
                  <div className="flex flex-col">
                    <h3 className="text-lg font-medium text-white mb-2">Team:</h3> {/* White text for better contrast */}
                    <h1 className="text-2xl font-bold text-white mb-2">Team Name</h1> {/* White text for better contrast */}
                    <div className="flex flex-row items-center mb-1">
                      <h3 className="mr-2 text-white">Country:</h3> {/* White text for better contrast */}
                      <span className="text-gray-400">Country Name</span> {/* Lighter gray for country name */}
                    </div>
                    <div className="flex flex-row items-center">
                      <h3 className="mr-2 text-white">Score:</h3> {/* White text for better contrast */}
                      <span className="text-emerald-400 font-medium">Score Value</span> {/* Green color for score */}
                    </div>
                  </div>
                </div>

                {/* Team Bio Section */}
                <div className=" w-[700px] prose text-white dark:prose-white"> {/* White text for bio */}
                  <h2 className="text-xl font-semibold mb-2 text-white">Team Bio</h2> {/* White text for bio title */}
                  <p>
                    This is a brief description or biography of the team. You can write several sentences here to provide some context about the team's goals, members, or achievements.
                  </p>
                  <p>You can add more paragraphs as needed.</p>
                </div>

                <div className="flex w-[670px] flex-row justify-between">
                  <h3 className="text-base font-medium text-white">Link:</h3> {/* White text for link label */}
                  <a href="example.com/ennui" className="text-sky-400 hover:underline">
                    example.com/ennui
                  </a> {/* Blue color for link */}
                </div>
              </div>
            </div>
          </div>
          <div className="flex bg-[#212121]  justify-center items-center  border border-[#333] rounded-lg ">
            <div className="flex-[1] bg-[#212121] px-7">
              <TeamMemberCard />
            </div>
          </div>
          <div className="flex-1 bg-[#212121] border border-[#333]">
            
            <TaskList tasks={tasks} />
          </div>
          <div>
            
            <div className="bg-[#1E1E1E] flex w-full pt-10 flex-row gap-20 justify-center items-center px-10 border-0 border-green">
              <div style={{ width: '300px', height: '300px' }}>
                <PieChart />
              </div>
              <div style={{ width: '30px', height: '300px' }}></div>
              <div style={{ width: '300px', height: '300px' }}>
                <PieChart />            <br /><br />
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
