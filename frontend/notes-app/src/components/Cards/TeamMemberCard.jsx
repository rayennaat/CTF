import React from 'react';

const TeamPage = () => {
  return (
    <div className="bg-[#212121] dark:bg-gray-900 px-10">
      <div className="container px-10 py-5 mx-auto">
        <h1 className="text-4xl font-semibold text-center text-gray-100 capitalize lg:text-3xl dark:text-white">Our Team</h1>{/* Text color changed here */}
        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center p-8 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:bg-[#374151] dark:hover:bg-[#374151] border-[#374151] dark:border-gray-700"> {/* Updated border color */}
            <img className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300 dark:ring-gray-600" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
            <h1 className="mt-4 text-2xl font-semibold text-gray-100 capitalize dark:text-white">Arthur Melo</h1>{/* Text color changed here */}
            <p className="mt-2 text-gray-400 capitalize dark:text-gray-300">Design Director</p>{/* Text color changed here */}
          </div>

          <div className="flex flex-col items-center p-8 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:bg-[#374151] dark:hover:bg-[#374151] border-[#374151] dark:border-gray-700"> {/* Updated border color */}
            <img className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300 dark:ring-gray-600" src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" alt="" />
            <h1 className="mt-4 text-2xl font-semibold text-gray-100 capitalize dark:text-white">Amelia Arson</h1>{/* Text color changed here */}
            <p className="mt-2 text-gray-400 capitalize dark:text-gray-300">Lead Developer</p>{/* Text color changed here */}
          </div>

          <div className="flex flex-col items-center p-8 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:bg-[#374151] dark:hover:bg-[#374151] border-[#374151] dark:border-gray-700"> {/* Updated border color */}
            <img className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300 dark:ring-gray-600" src="https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />
            <h1 className="mt-4 text-2xl font-semibold text-gray-100 capitalize dark:text-white">Olivia Wathan</h1>{/* Text color changed here */}
            <p className="mt-2 text-gray-400 capitalize dark:text-gray-300">Lead Designer</p>{/* Text color changed here */}
          </div>

          <div className="flex flex-col items-center p-8 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:bg-[#374151] dark:hover:bg-[#374151] border-[#374151] dark:border-gray-700"> {/* Updated border color */}
            <img className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300 dark:ring-gray-600" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
            <h1 className="mt-4 text-2xl font-semibold text-gray-100 capitalize dark:text-white">John Doe</h1>{/* Text color changed here */}
            <p className="mt-2 text-gray-400 capitalize dark:text-gray-300">Full Stack Developer</p>{/* Text color changed here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;