import React from 'react'

const TasksSolved = () => {
    const tableItems = [
        {
          challenge: "Challenge 1",
          category: "Category A",
          value: 100,
          time: "January 18th, 7:43:19 AM",
        },
        {
          challenge: "Challenge 2",
          category: "Category B",
          value: 200,
          time: "February 2nd, 10:15:00 PM", // Example with different month and time
        },
        {
          challenge: "Challenge 3",
          category: "Category C",
          value: 300,
          time: "March 15th, 1:00:00 PM",
        },
        {
          challenge: "Challenge 4",
          category: "Category D",
          value: 400,
          time: "April 29th, 4:30:00 AM",
        },
        {
          challenge: "Challenge 5",
          category: "Category E",
          value: 500,
          time: "May 10th, 9:00:00 PM",
        },
            {
          challenge: "Challenge 6",
          category: "Category F",
          value: 600,
          time: "June 1st, 11:11:11 AM",
        },
            {
          challenge: "Challenge 7",
          category: "Category G",
          value: 700,
          time: "July 22nd, 2:22:22 PM",
        },
            {
          challenge: "Challenge 8",
          category: "Category H",
          value: 800,
          time: "August 8th, 8:08:08 AM",
        },
            {
          challenge: "Challenge 9",
          category: "Category I",
          value: 900,
          time: "September 19th, 5:55:55 PM",
        },
            {
          challenge: "Challenge 10",
          category: "Category J",
          value: 1000,
          time: "October 31st, 12:00:00 AM",
        },
      ];
  return (
        <div className="max-w-screen-3xl mx-auto px-4 md:px-1">
            <div className="mt-12 shadow-sm border border-zinc-600 rounded-md overflow-x-auto font-mono">
                <table className="w-full table-fixed text-sm text-left"> {/* table-fixed added */}
                    <thead className="bg-transparent text-gray-100 font-medium border border-[#424242]">
                        <tr>
                            <th className="py-3 px-6 w-1/4">Challenge</th> {/* Example width */}
                            <th className="py-3 px-6 w-1/4">Category</th>  {/* Example width */}
                            <th className="py-3 px-6 w-1/4">Value</th>     {/* Example width */}
                            <th className="py-3 px-6 w-1/4">Time</th>      {/* Example width */}
                        </tr>
                    </thead>
                    <tbody className=" divide-y">
                        {tableItems.map((item, idx) => (
                            <tr key={idx} className='bg-[#292929] hover:bg-[#424242] border border-[#424242]'>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-100">{item.challenge}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-100">{item.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-100">{item.value}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-100">{item.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TasksSolved
