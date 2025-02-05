import React, { useState } from 'react';

export const teamsData = [
    { id: 1, name: "Ennui 185", site: "example.com/ennui", affiliation: "University X", country: "USA" },
    { id: 2, name: "Viral574", site: "viral.net", affiliation: "Company Y", country: "Canada" },
    { id: 3, name: "Yolo268", site: "yolo.org", affiliation: "Online Community", country: "UK" },
    { id: 4, name: "Cliche685", site: "cliche.io", affiliation: "Organization Z", country: "France" },
    { id: 5, name: "Wes499", site: "wes.dev", affiliation: "Independent", country: "Germany" },
    { id: 6, name: "Art117", site: "art.gallery", affiliation: "Art Collective", country: "Spain" },
    { id: 7, name: "Echo194", site: "echo.fm", affiliation: "Music Group", country: "Japan" },
    { id: 8, name: "Church-key762", site: "churchkey.beer", affiliation: "Brewery", country: "Belgium" },
];

const TeamCards = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredTeams = teamsData.filter(team =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  return (
        <> <br />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
                {filteredTeams.map((team) => (
                    <div
                    key={team.id}
                    className="bg-[#2A2A2A] dark:bg-[#2A2A2A] rounded-lg shadow-md p-6 border border-neutral-500 dark:border-gray-600 hover:scale-105 transition-transform duration-200"
                >
                    <h3 className="text-xl font-semibold text-gray-200 dark:text-gray-200 mb-2">
                        {team.name}
                    </h3>
                    <div className="flex flex-col space-y-1">
                        <p className="text-gray-400 dark:text-gray-400">
                            <span className="font-medium text-gray-300 dark:text-gray-300">Site:</span>{" "}
                            <a
                                href={team.site}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline dark:text-blue-400"
                            >
                                {team.site}
                            </a>
                        </p>
                        <p className="text-gray-400 dark:text-gray-400">
                            <span className="font-medium text-gray-300 dark:text-gray-300">
                                Affiliation:
                            </span>{" "}
                            {team.affiliation}
                        </p>
                        <p className="text-gray-400 dark:text-gray-400">
                            <span className="font-medium text-gray-300 dark:text-gray-300">
                                Country:
                            </span>{" "}
                            {team.country}
                        </p>
                    </div>
                </div>
                
                ))}
            </div></>
  )
}

export default TeamCards
