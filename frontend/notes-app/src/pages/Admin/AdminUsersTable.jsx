import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function AdminUsersTable() {
  const [active, setActive] = useState("Main");
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("Name");
  const [data, setData] = useState([]); // Store fetched users
  const [filteredData, setFilteredData] = useState([]); // Store filtered users

  // Fetch users from API
  useEffect(() => {
    fetch("http://localhost:5000/api/users") // Use the correct endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the response as JSON
      })
      .then((users) => {
        console.log("Fetched users:", users); // Log the fetched data

        // Format the users to match the table structure
        const formattedUsers = users.map((user) => ({
          id: user._id, // Use _id as id
          fullName: user.fullName,
          rawEmail: user.rawEmail,
          country: "Tunisia", // Placeholder
          role: "User", // Placeholder
          hidden: "", // Placeholder
          banned: "", // Placeholder
        }));

        setData(formattedUsers); // Store the formatted users
        setFilteredData(formattedUsers); // Initially, filtered data is the same
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Filter users based on searchQuery
  useEffect(() => {
    const filtered = data.filter((row) =>
      filterOption === "Id"
        ? row.id.toString().includes(searchQuery)
        : row.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, filterOption, data]);

  const handleEdit = () => {
    console.log("Editing selected users:", selectedRows);
    // Implement edit logic
  };

  const handleDelete = () => {
    console.log("Deleting selected users:", selectedRows);
    // Implement delete logic
  };
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar active={active} setActive={setActive} />
      <main className="flex-1 ml-64 p-10 flex flex-col justify-center items-center relative overflow-hidden gap-8">
        <h1 className="text-4xl md:text-6xl font-extrabold text-cyan-500 drop-shadow-md mb-4 text-center">
          USERS
        </h1>
        <div></div>
        <div></div>
        {/* Toolbar */}
        <div className="flex justify-between items-center w-full max-w-5xl mb-4">
          {/* Search and Select */}
          <div className="flex flex-row gap-2">
            <select
              className="p-2 w-[120px] bg-gray-800 border border-gray-700 rounded text-gray-300 focus:ring-2 focus:ring-cyan-400"
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
            >
              <option value="Id">Id</option>
              <option value="Name">User</option>
            </select>
            <input
              type="text"
              className="p-2 w-[600px] bg-gray-800 border border-gray-700 rounded text-gray-300 focus:ring-2 focus:ring-cyan-400 ml-4"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* Edit & Delete Buttons */}
          <div className="flex gap-2">
            <button
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-300 disabled:opacity-50"
              onClick={handleEdit}
              disabled={selectedRows.length === 0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.121-2.121l-6.364 6.364a1.5 1.5 0 00-.394.657l-.894 3.577a.375.375 0 00.46.46l3.577-.894a1.5 1.5 0 00.657-.394l6.364-6.364m-3.536-3.536L9 15.25" />
              </svg>
            </button>
            <button
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-300 disabled:opacity-50"
              onClick={handleDelete}
              disabled={selectedRows.length === 0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142C18.011 20.016 17.123 21 16 21H8c-1.123 0-2.011-.984-2.133-1.858L5 7m5 4v6m4-6v6m1-8V4H9v2m7 0H8m0-2a2 2 0 114 0v2" />
              </svg>
            </button>
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto w-full max-w-5xl">
          <table className="table-auto w-full border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-800 text-gray-300">
                <th className="border border-gray-700 px-2 py-2 text-center w-12">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows(filteredData.map((row) => row.id));
                      } else {
                        setSelectedRows([]);
                      }
                    }}
                    checked={selectedRows.length === filteredData.length}
                  />
                </th>
                <th className="border border-gray-700 px-4 py-2 text-left">ID</th>
                <th className="border border-gray-700 px-4 py-2 text-left">User</th>
                <th className="border border-gray-700 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-700 px-4 py-2 text-left">Country</th>
                <th className="border border-gray-700 px-4 py-2 text-left">Role</th>
                <th className="border border-gray-700 px-4 py-2 text-left">Hidden</th>
                <th className="border border-gray-700 px-4 py-2 text-left">Banned</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={row.id} className={`${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"} text-gray-300 hover:bg-gray-600`}>
                  <td className="border border-gray-700 px-2 py-2 text-center w-12">
                    <input
                      type="checkbox"
                      onChange={() => {
                        setSelectedRows((prevSelectedRows) =>
                          prevSelectedRows.includes(row.id)
                            ? prevSelectedRows.filter((rowId) => rowId !== row.id)
                            : [...prevSelectedRows, row.id]
                        );
                      }}
                      checked={selectedRows.includes(row.id)}
                    />
                  </td>
                  <td className="border border-gray-700 px-4 py-2">{row.id}</td>
                  <td className="border border-gray-700 px-4 py-2">{row.fullName}</td>
                  <td className="border border-gray-700 px-4 py-2">{row.rawEmail}</td>
                  <td className="border border-gray-700 px-4 py-2">{row.country}</td>
                  <td className="border border-gray-700 px-4 py-2">{row.role}</td>
                  <td className="border border-gray-700 px-4 py-2">{row.hidden}</td>
                  <td className="border border-gray-700 px-4 py-2">{row.banned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}