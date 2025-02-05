import React, { useState } from 'react';

const TaskList = ({ tasks }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('0');
    const tasksPerPage = 9; // Number of tasks to display per page

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setCurrentPage(1); // Reset to the first page when category changes
    };

    const categories = [...new Set(tasks.map((task) => task.category))]; // Get unique categories

    const filteredTasks =
        selectedCategory === '0'
            ? tasks
            : tasks.filter((task) => task.category === selectedCategory);

    // Pagination Logic
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="flex justify-center items-center space-x-2 mt-4">
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`px-3 py-1 border rounded ${
                            currentPage === number
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        {number}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <>
            <div
                className="bg-[#1E1E1E] overflow-y-auto w-full h-[700px] px-12"
                style={{ WebkitOverflowScrolling: 'touch' }}
            >          <br />
                <h1 className="bg-[#1E1E1E]py-3 text-center text-2xl font-mono text-gray-500 uppercase tracking-wide">
                    Tasks Solved
                </h1><br />
                
                <table className="min-w-full divide-y ">
                    <thead className="bg-transparent text-gray-100 font-medium border border-[#424242]">
                        <tr>
                           <select
                            id="categorySelect"
                            className="px-6 py-3 text-left text-xs font-medium border-2 border-gray-400 text-gray-500 uppercase tracking-wider mb-4"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="0">All Categories</option>
                            {categories.map((category, index) => (
                                <option key={index + 1} value={category}>
                                    {category}
                                </option>
                            ))}
                            </select>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                            >
                                Challenge
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                            >
                                Value
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                            >
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody className=" divide-y ">
                        {currentTasks.map((task, index) => (
                            <tr key={index} className="bg-[#292929] hover:bg-[#424242] border border-[#424242]">
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-100">
                                    {task.category}
                                </td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-100">
                                    {task.challenge}
                                </td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-100">
                                    {task.value}
                                </td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-100">
                                    {task.time}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {renderPagination()}
            </div>
        </>
    );
};

const tasks = [
    { category: 'Web', challenge: 'Login Bypass', value: 100, time: 'January 18th, 10:59:28 AM' },
    { category: 'Crypto', challenge: 'RSA Decryption', value: 200, time: 'January 18th, 11:15:42 AM' },
    { category: 'Forensics', challenge: 'Image Analysis', value: 300, time: 'January 18th, 12:05:13 PM' },
    { category: 'Reverse Engineering', challenge: 'Binary Exploitation', value: 400, time: 'January 18th, 01:22:48 PM' },
    { category: 'Pwn', challenge: 'Stack Overflow', value: 500, time: 'January 18th, 02:30:56 PM' },
    { category: 'Games', challenge: 'Tetris High Score', value: 150, time: 'January 18th, 03:14:22 PM' },
    { category: 'Web', challenge: 'XSS Vulnerability', value: 250, time: 'January 18th, 04:02:38 PM' },
    { category: 'Crypto', challenge: 'AES Encryption', value: 350, time: 'January 18th, 05:11:49 PM' },
    { category: 'Forensics', challenge: 'Network Traffic Analysis', value: 450, time: 'January 18th, 06:22:35 PM' },
    { category: 'Reverse Engineering', challenge: 'Code Decompilation', value: 300, time: 'January 18th, 07:15:50 PM' },
    { category: 'Pwn', challenge: 'Heap Overflow', value: 200, time: 'January 18th, 08:19:10 PM' },
    { category: 'Web', challenge: 'SQL Injection', value: 150, time: 'January 18th, 09:45:30 PM' },
    { category: 'Crypto', challenge: 'Hash Cracking', value: 50, time: 'January 18th, 10:00:01 PM' },
    { category: 'Forensics', challenge: 'Memory Forensics', value: 350, time: 'January 18th, 10:30:15 PM' },
    { category: 'Reverse Engineering', challenge: 'Debugging', value: 450, time: 'January 18th, 11:12:30 PM' },
    { category: 'Pwn', challenge: 'Format String Vulnerability', value: 500, time: 'January 18th, 11:55:45 PM' },
    { category: 'Games', challenge: 'Chess Tournament', value: 300, time: 'January 18th, 11:59:59 PM' },
];

const MyComponent = () => {
    return (
        <div className="">
            <TaskList tasks={tasks} />
        </div>
    );
};

export default MyComponent;
