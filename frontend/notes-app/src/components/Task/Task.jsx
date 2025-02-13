import React, { useState, useEffect } from "react";
import Blood from "../../assets/images/blood.png";

const Task = ({ task, onClose }) => {
  const [activeTab, setActiveTab] = useState("challenge");
  const [showHint, setShowHint] = useState(false);
  const [solves, setSolves] = useState([]);

  useEffect(() => {
    if (!task || !task.solvedByUsers?.length) return;

    const userIds = task.solvedByUsers.map(entry => entry.user_id).join(",");

    fetch(`http://localhost:5000/api/users/solved?userIds=${userIds}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then(userData => {
        const formattedSolves = task.solvedByUsers.map(entry => ({
          fullName: userData.find(user => user._id === entry.user_id)?.fullName || "Unknown",
          time: new Date(entry.time).toLocaleString(),
        }));
        setSolves(formattedSolves);
      })
      .catch(error => console.error("Error fetching users:", error));
  }, [task]);

  if (!task) return null;

  const handleOutsideClick = (e) => {
    if (e.target.id === "popup-overlay") {
      onClose();
    }
  };

  return (
    <div
      id="popup-overlay"
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-green-400 p-8 rounded-lg shadow-2xl w-[550px] transform transition-transform duration-500 ease-out">
        <button
          className="absolute top-4 right-4 text-green-400 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          ✖
        </button>
        <div className="flex mb-4 border-b border-gray-700">
          <button
            className={`px-4 py-2 font-mono ${
              activeTab === "challenge"
                ? "bg-gray-800 text-green-400 border-b-2 border-green-400 rounded-t-md"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("challenge")}
          >
            CHALLENGE
          </button>
          <button
            className={`px-4 py-2 font-mono ${
              activeTab === "solves"
                ? "bg-gray-800 text-green-400 border-b-2 border-green-400 rounded-t-md"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("solves")}
          >
            SOLVES
          </button>
        </div>
        {/* Conditional Content */}
        {activeTab === "challenge" && (
          <div>
            <h1 className="text-3xl font-mono font-bold mb-4">
              🕵️‍♂️ {task.title}
            </h1>
            <p className="text-lg font-mono font-semibold mb-4">
              💰 Points: <span className="text-yellow-500">{task.points}</span>
            </p>
            <p className="text-sm font-mono text-gray-300 mb-6 border-l-4 pl-4 border-green-500">
              {task.description}
            </p>
            {task.resource && (
              <div className="mt-4">
                <p className="text-sm font-mono text-gray-300 mb-2 border-l-4 pl-4 border-green-400">
                  Resource:
                </p>
                <a
                  href={`http://localhost:5000${task.resource}`}
                  download
                  className="text-green-400 hover:underline"
                >
                  Download Resource
                </a>
              </div>
            )}
            {!task.resource && (
              <div className="mt-4">
                <p className="text-sm font-mono text-gray-300 mb-2 border-l-4 pl-4 border-green-400">
                  Resource:
                </p>
                <p className="text-sm font-mono text-gray-300">No Resource Available</p>
              </div>
            )}
            {task.hint && (
              <div>
                <button
                  className="mt-2 px-6 py-2 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 text-green-400 hover:bg-green-600 border border-green-500 rounded-md shadow-md font-mono"
                  onClick={() => setShowHint(!showHint)}
                >
                  {showHint ? "Hide Hint" : "Hint"}
                </button>
                {showHint && (
                  <p className="mt-4 py-1 text-sm font-mono text-gray-300 border-l-4 pl-4 bg-gray-800 rounded-md">
                    {task.hint}
                  </p>
                )}
              </div>
            )}
            <input
              type="text"
              placeholder="Enter your flag here..."
              className="w-full mt-3 px-4 py-2 text-green-300 bg-black border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 font-mono"
            />
            <button
              className="mt-6 px-6 py-2 bg-green-500 hover:bg-green-600 text-black font-mono font-bold rounded-md shadow-lg transition-transform duration-300 hover:scale-105"
              onClick={onClose}
            >
              Submit Flag
            </button>
          </div>
        )}
        {activeTab === "solves" && (
          <div className="p-4">
            {solves.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-700 text-gray-300 font-mono">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-gray-800">
                  {solves.map((solve, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap flex items-center">
                        {solve.fullName}
                        {index === 0 && <img src={Blood} alt="First Blood" className="w-5 h-6 ml-2" />}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{solve.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-300 font-mono text-center">No one solved it yet!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;