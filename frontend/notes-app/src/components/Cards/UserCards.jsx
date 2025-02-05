import React, { useState } from 'react';

export const teamsData = [
    { id: 1, name: "Ennui 185", site: "example.com/ennui", team: "Alpha Coders", country: "USA" },
    { id: 2, name: "Viral574", site: "viral.net", team: "Design Gurus", country: "Canada" },
    { id: 3, name: "Yolo268", site: "yolo.org", team: "Code Masters", country: "UK" },
    { id: 4, name: "Cliche685", site: "cliche.io", team: "Tech Pioneers", country: "France" },
    { id: 5, name: "Wes499", site: "wes.dev", team: "Future Builders", country: "Germany" },
    { id: 6, name: "Art117", site: "art.gallery", team: "Alpha Coders", country: "Spain" },
    { id: 7, name: "Echo194", site: "echo.fm", team: "Design Gurus", country: "Japan" },
    { id: 8, name: "Church-key762", site: "churchkey.beer", team: "Code Masters", country: "Belgium" },
];

const UserCards = () => {
    const [searchTerm, setSearchTerm] = useState("");  
    const filteredTeams = teamsData.filter(team =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <br />
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
                                <span className="font-medium text-gray-300 dark:text-gray-300">Team:</span> {team.team}
                            </p>
                            <p className="text-gray-400 dark:text-gray-400">
                                <span className="font-medium text-gray-300 dark:text-gray-300">Country:</span> {team.country}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default UserCards;
