import React, { useState } from "react";
import UserBar from "../../components/UserBar/UserBar";
import { LineGraph } from "../../Graphs/Line";
import { BarChart } from "../../Graphs/Bar";
import { BumpChart } from "../../Graphs/Bump";
import Bump from "../../assets/images/bump.png"
import Bar2 from "../../assets/images/Bar2.png"
import line2 from "../../assets/images/chart.png"
import TabelTeams from "../../components/Tabels/TabelTeams";



const Scoreboard = () => {
  const [viewMode, setViewMode] = useState("line"); // Default view mode

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="bg-gray-900 dark:bg-[#1E1E1E] min-h-screen pb-1 transition-colors duration-300">
      <UserBar />
      <br /><br /><br /><br /><br /><br />
      <h1 className="text-4xl md:text-6xl font-extrabold text-[#8D6E63] drop-shadow-md mb-4 text-center">
        SCOREBOARD
      </h1> <br /><br />
      
      <div className="flex justify-center space-x-2">
        <button
          className={`my-2 bg-white transition duration-150 ease-in-out hover:bg-gray-100 hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 p-2 text-xs focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 w-10 ${
            viewMode === "bar" ? "text-white ring-2 ring-offset-2 ring-indigo-700" : ""
          }`}
          onClick={() => handleViewModeChange("bar")}
        >
          <img src={Bar2} alt="Bar Chart Icon" className="h-4 w-4 mx-auto" />
        </button>
        <button
          className={`my-2 bg-white transition duration-150 ease-in-out hover:bg-gray-100 hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 p-2 text-xs focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 w-10 ${
            viewMode === "line" ? "text-white ring-2 ring-offset-2 ring-indigo-700" : ""
          }`}
          onClick={() => handleViewModeChange("line")}
        >
          <img src={line2} alt="Line Chart Icon" className="h-4 w-4 mx-auto" />
        </button>
        <button
          className={`my-2 bg-white transition duration-150 ease-in-out hover:bg-gray-100 hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 p-2 text-xs focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 w-10 ${
            viewMode === "bump" ? "text-white ring-2 ring-offset-2 ring-indigo-700" : ""
          }`}
          onClick={() => handleViewModeChange("bump")}
        >
          <img src={Bump} alt="Bump Chart Icon" className="h-4 w-4 mx-auto" />
        </button>
      </div>

      <div className="w-full max-w-4xl mx-auto p-4">
        {viewMode === "line" && <LineGraph />}
        {viewMode === "bar" && <BarChart />}
        {viewMode === "bump" && <BumpChart />}
      </div> <br />
      <div className="w-full max-w-7xl mx-auto p-4">  
        <TabelTeams/>
        </div>      
    </div>
  );
};

export default Scoreboard;
