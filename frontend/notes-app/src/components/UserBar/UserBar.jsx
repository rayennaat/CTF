import React from 'react';
import { Link, useLocation  } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { FaSignOutAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";



const UserBar = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const onLogout = () =>{
    localStorage.clear()
    navigate("/login");
  };
  return (
    <nav
    className={`absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-4`}
    >
      <div className="flex items-center space-x-2 ">
        
          <a href="/home" className="w-20 h-6 bg-[#8D6E63] rounded-full flex justify-center items-center">
            <span className="text-white font-bold text-sm">CTF.tn</span>
          </a>
        
      </div>
      <ul className="flex space-x-8">
        <li>
            <Link  
            to="/users"
            className={`text-sm text-white cursor-pointer ${location.pathname === '/users' ? 'text-[#A1887F]' : 'hover:text-[#A1887F]'}`}
            >
            Users
            </Link>
        </li>
        <li>
            <Link
            to="/teams"
            className={`text-sm text-white cursor-pointer ${location.pathname === '/teams' ? 'text-[#A1887F]' : 'hover:text-[#A1887F]'}`}
            >
            Teams
            </Link>
        </li>
        <li>
            <Link
            to="/scoreboard"
            className={`text-sm text-white cursor-pointer ${location.pathname === '/scoreboard' ? 'text-[#A1887F]' : 'hover:text-[#A1887F]'}`}
            >
            Scoreboard
            </Link>
        </li>
        <li>
            <Link
            to="/challenges"
            className={`text-sm text-white cursor-pointer ${location.pathname === '/challenges' ? 'text-[#A1887F]' : 'hover:text-[#A1887F]'}`}
            >
            Challenges
            </Link>
        </li>
        
       </ul>

      <div className="flex items-center gap-px space-x-4">
     
      <Link
            to="/team"
            className={`flex flex-row items-center text-white cursor-pointer ${
                location.pathname === '/team' ? 'text-[#A1887F]' : 'hover:text-[#A1887F]'
            }`}
        >
            <FaUserGroup className="mr-1 text-sm" /> {/* Reduced margin and icon size */}
            <span className="text-sm">Team</span> {/* Smaller text */}
        </Link>
        <Link
            to="/profileuser"
            className={`flex flex-row text-white items-center cursor-pointer ${
                location.pathname === '/profileuser' ? 'text-[#A1887F]' : 'hover:text-[#A1887F]'
            }`}
        >
            <FaUser className="mr-1 text-xs" /> {/* Reduced margin and icon size */}
            <span className="text-sm">Profile</span> {/* Smaller text */}
        </Link>       
          <Link onClick={onLogout}
            to="/login"
            className="w-9 h-7 bg-[#8D6E63] text-white rounded-md hover:bg-[#BCAAA4] flex items-center justify-center" // Key changes here
          >
            <FaSignOutAlt className="text-sm"/>
          </Link>
        
      </div>
    </nav>
  );
};

export default UserBar;
