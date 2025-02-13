import { FaChartBar, FaTasks, FaUsers, FaUsersCog, FaListOl, FaFileUpload, FaCogs, FaAtom  } from "react-icons/fa";

export default function Sidebar({ active, setActive }) {
  const menuItems = [
    { name: "Main", icon: <FaAtom /> },
    { name: "Statistics", icon: <FaChartBar /> },
    { name: "Challenges", icon: <FaTasks /> },
    { name: "Users", icon: <FaUsers /> },
    { name: "Teams", icon: <FaUsersCog /> },
    { name: "Scoreboard", icon: <FaListOl /> },
    { name: "Submissions", icon: <FaFileUpload /> },
    { name: "Config", icon: <FaCogs /> },
  ];

  return (
    <aside className="w-64 p-5 bg-gray-800 bg-opacity-70 backdrop-blur-lg shadow-lg border-r border-gray-700 fixed h-full flex flex-col gap-10">
      <h2 className="text-2xl font-bold mb-5 text-center text-blue-400">Admin Dashboard</h2>
      <ul className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <li
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg transition-all duration-300 
              ${active === item.name ? "bg-blue-500 text-white shadow-lg scale-105" : "hover:bg-gray-700 hover:scale-105"}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
