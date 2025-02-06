import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TasksSolved = ({ userId }) => {
  const [solvedChallenges, setSolvedChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch solved challenges for the user
  useEffect(() => {
    const fetchSolvedChallenges = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/challenges/solved-by-user/${userId}`
        );
        setSolvedChallenges(response.data);
      } catch (err) {
        console.error('Error fetching solved challenges:', err);
        setError('Failed to fetch solved challenges');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchSolvedChallenges();
    }
  }, [userId]);

  if (loading) {
    return <p className="text-white text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="max-w-screen-3xl mx-auto px-4 md:px-1">
      <div className="mt-12 shadow-sm border border-zinc-600 rounded-md overflow-x-auto font-mono">
        <table className="w-full table-fixed text-sm text-left">
          <thead className="bg-transparent text-gray-100 font-medium border border-[#424242]">
            <tr>
              <th className="py-3 px-6 w-1/4">Challenge</th>
              <th className="py-3 px-6 w-1/4">Category</th>
              <th className="py-3 px-6 w-1/4">Value</th>
              <th className="py-3 px-6 w-1/4">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {solvedChallenges.map((challenge, idx) => (
              <tr
                key={idx}
                className="bg-[#292929] hover:bg-[#424242] border border-[#424242]"
              >
                <td className="px-6 py-4 whitespace-nowrap text-gray-100">
                  {challenge.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-100">
                  {challenge.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-100">
                  {challenge.points}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-100">
                  {new Date(challenge.time).toLocaleString()} {/* Format the time */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TasksSolved;