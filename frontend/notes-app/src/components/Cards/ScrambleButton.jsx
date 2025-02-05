import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import { FiLock } from 'react-icons/fi'; // Only the lock icon is needed
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Task from '../Task/Task';
import axios from "axios"; 

const TaskCard = () => {
  const [challenges, setChallenges] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTeamId = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }
  
      const response = await axios.get("http://localhost:5000/get-teamid", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // ✅ Ensure correct headers
        },
        params: { _: Date.now() }, // ✅ Prevent caching issues
      });
  
      console.log("Full Response from API:", response.data); // 🔍 Debugging
  
      if (response.data?.teamId) {
        console.log("Fetched Team ID:", response.data.teamId);
        return response.data.teamId;
      } else {
        console.error("Team ID not found in response.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching team ID:", error.message);
      return null;
    }
  };
  fetchTeamId().then(teamId => console.log("Final Team ID:", teamId));

  // Fetch challenges from the API
  useEffect(() => {
    fetch("http://localhost:5000/api/challenges")  // Change this URL if needed
      .then(response => response.json())
      .then(data => {
        setChallenges(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching challenges:", error);
        setLoading(false);
      });
  }, []);

  // Group challenges by category
  const groupedChallenges = challenges.reduce((groups, challenge) => {
    if (!groups[challenge.category]) {
      groups[challenge.category] = [];
    }
    groups[challenge.category].push(challenge);
    return groups;
  }, {});
  
  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleClosePopup = () => {
    setSelectedTask(null);
  };
  return (
    <>
    {loading ? (
      <p className="text-white text-center">Loading challenges...</p>
    ) : (
      Object.entries(groupedChallenges).map(([category, challenges]) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-bold text-[#E0E0E0] dark:text-gray-200 mb-4 font-mono">
            {category} Challenges
          </h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {challenges.map((challenge) => (
              <div
                key={challenge._id}
                className="rounded-md w-[300px] h-[105px] shadow-md transform transition duration-300 hover:scale-105 cursor-pointer"
                onClick={() => handleTaskClick(challenge)}
              >
                <EncryptButton
                  title={challenge.title}
                  points={`Points: ${challenge.points}`}
                />
              </div>
            ))}
          </div>
        </div>
      ))
    )}
  
    {/* Move Task component here */}
    {selectedTask && <Task task={selectedTask} onClose={handleClosePopup} />}
  </>
  
  );
};

const CHARS = "!@#$%^&*():{};|,.<>/?";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

const EncryptButton = ({ title, points }) => {
  const intervalRef = useRef(null); // useRef is now properly imported
  const [text, setText] = useState(title);
  const [text2, setText2] = useState(points);

  const scramble = () => {
    let pos = 0;
    intervalRef.current = setInterval(() => {
      const scrambledTitle = title
        .split("")
        .map((char, index) => (pos / CYCLES_PER_LETTER > index ? char : CHARS[Math.floor(Math.random() * CHARS.length)]))
        .join("");

      const scrambledPoints = points
        .split("")
        .map((char, index) => (pos / CYCLES_PER_LETTER > index ? char : CHARS[Math.floor(Math.random() * CHARS.length)]))
        .join("");

      setText(scrambledTitle);
      setText2(scrambledPoints);
      pos++;
      if (pos >= title.length * CYCLES_PER_LETTER) stopScramble();
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);
    setText(title);
    setText2(points);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.975 }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className="group relative overflow-hidden rounded-lg border w-[300px] h-[105px] flex flex-col justify-center items-center font-mono font-medium uppercase transition-colors border-neutral-500 bg-neutral-700 text-neutral-300 hover:text-indigo-300"
    >
      <div className="relative z-10 flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <FiLock /> {/* Only the lock icon is shown now */}
          <span>{text}</span>
        </div>
        <span className="text-sm text-neutral-400">{text2}</span>
      </div>
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: "-100%" }}
        transition={{ repeat: Infinity, repeatType: "mirror", duration: 1, ease: "linear" }}
        className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/100 to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
      />
    </motion.button>
  );
};

EncryptButton.propTypes = {
  title: PropTypes.string.isRequired,
  points: PropTypes.string.isRequired,
};

export default TaskCard;