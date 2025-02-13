import React from 'react';
import UserBar from "../../components/UserBar/UserBar";
import TaskCard from "../../components/Cards/ScrambleButton";

const ChallengesPage = () => {
  return (
    <div className="bg-gray-900 dark:bg-[#1E1E1E] min-h-screen pb-1 transition-colors duration-300">
      <UserBar />
      <br /><br /><br /><br /><br /><br />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-extrabold text-rose-500 drop-shadow-md mb-4 text-center">
          CHALLENGES
        </h1>
        <br /><br />

        {/* Render TaskCard without passing any props */}
        <TaskCard />
      </div>
    </div>
  );
};

export default ChallengesPage;