import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeamCards = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch teams from API
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/teams');
        setTeams(response.data);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError('Failed to fetch teams');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return <p className="text-white text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.length > 0 ? (
          teams.map((team) => (
            <div
              key={team._id}
              className="bg-[#2A2A2A] dark:bg-[#2A2A2A] rounded-lg shadow-md p-6 border border-neutral-500 dark:border-gray-600 hover:scale-105 transition-transform duration-200"
            >
              <h3 className="text-xl font-semibold text-gray-200 dark:text-gray-200 mb-2">
                {team.name}
              </h3>
              <div className="flex flex-col space-y-1">
                <p className="text-gray-400 dark:text-gray-400">
                  <span className="font-medium text-gray-300 dark:text-gray-300">Site:</span>{' '}
                  <a
                    href={team.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline dark:text-blue-400"
                  >
                    {team.link ? team.link : ''}
                  </a>
                </p>
                <p className="text-gray-400 dark:text-gray-400">
                  <span className="font-medium text-gray-300 dark:text-gray-300">Affiliation:</span>{' '}
                  Affiliation
                </p>
                <p className="text-gray-400 dark:text-gray-400">
                  <span className="font-medium text-gray-300 dark:text-gray-300">Country:</span>{' '}
                  Tunisia
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center w-full">No teams found</p>
        )}
      </div>
    </>
  );
};

export default TeamCards;
