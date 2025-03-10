import React, { useState } from 'react';
import UserBar from '../../components/UserBar/UserBar';
import SearchTeam from '../../components/UserBar/SearchTeam';
import TeamCards from '../../components/Cards/TeamCards';
import TabelTeams from '../../components/Tabels/TabelTeams';
import { PiCardsThreeLight } from "react-icons/pi";
import { VscTable } from "react-icons/vsc";

const Teams = () => {
  const [searchTerm, setSearchTerm] = useState("");
 
  const [viewMode, setViewMode] = useState('cards'); // Initial view mode (set to 'cards' for default hover)

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };
  

  return (
    <div className="bg-[#1E1E1E] dark:bg-[#1E1E1E] min-h-screen pb-1 transition-colors duration-300"> {/* Added background and min-h-screen */}
      <UserBar />
      <br /><br /><br /><br /><br /><br />
      <h1 className="text-4xl md:text-6xl font-extrabold text-[#8D6E63] drop-shadow-md mb-4 text-center">
        TEAMS
      </h1> <br /><br />
      <div className="container mx-auto p-10">
        <div className="mb-6 flex space-x-4">
          <div>
            <SearchTeam/>
          </div>
          <input
            type="text"
            placeholder="Search for matching teams"
            className="border rounded-sm px-3 py-2 w-3/4 bg-[#515151] text-white shadow-sm dark:bg-gray-800 border-transparent focus:outline-none focus:ring-1 focus:ring-[#707070] placeholder-zinc-400 font-mono transition duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-[#616161] hover:bg-[#515151] text-white font-bold py-2 px-4 rounded-sm w-1/5">
            Q
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            className={`my-2 bg-[#424242] hover:bg-[#515151] text-gray-300 transition duration-150 ease-in-out rounded border border-[#707070] p-2 w-10 focus:outline-none focus:ring-2 focus:ring-[#707070] ${viewMode === 'cards' ? ' border-[#78909C] text-white ring-0' : ''}`} // Changed active state color
            onClick={() => handleViewModeChange('cards')}
          >
            <PiCardsThreeLight className="h-4 w-4 mx-auto" />
          </button>
          <button
            className={`my-2 bg-[#424242] hover:bg-[#515151] text-gray-300 transition duration-150 ease-in-out rounded border border-[#707070] p-2 w-10 focus:outline-none focus:ring-2 focus:ring-[#707070] ${viewMode === 'table' ? ' border-[#78909C] text-white ring-0' : ''}`} // Changed active state color
            onClick={() => handleViewModeChange('table')}
          >
            <VscTable className="h-4 w-4 mx-auto" />
          </button>
        </div>
        {viewMode === 'cards' && <TeamCards />}
        {viewMode === 'table' && <TabelTeams />}
      </div>
    </div>
  );
};

export default Teams;