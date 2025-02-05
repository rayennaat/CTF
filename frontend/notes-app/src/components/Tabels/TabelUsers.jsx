import React from 'react';

const TabelUsers = () => {
    const tableItems = [
        {
            name: "Liam James",
            website: "liamjames.com",
            team: "Alpha Coders",
            country: "Tunisia",
        },
        {
            name: "Olivia Emma",
            website: "oliviaemma.io",
            team: "Design Gurus",
            country: "Tunisia",
        },
        {
            name: "William Benjamin",
            website: "williambenjamin.dev",
            team: "Code Masters",
            country: "UK",
        },
        {
            name: "Henry Theodore",
            website: "henrytheodore.tech",
            team: "Tech Pioneers",
            country: "Palestine",
        },
        {
            name: "Amelia Elijah",
            website: "ameliaelijah.org",
            team: "Future Builders",
            country: "Germany",
        },
    ];

    return (
        <div className="max-w-screen-3xl mx-auto px-4 md:px-1">
            <div className="mt-12 shadow-sm border border-[#424242] rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-transparent text-gray-100 font-medium border border-[#424242]">
                        <tr>
                            <th className="py-3 px-6">Name</th>
                            <th className="py-3 px-6">Website</th>
                            <th className="py-3 px-6">Team</th>
                            <th className="py-3 px-6">Country</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {tableItems.map((item, idx) => (
                            <tr 
                              key={idx}
                              className="bg-[#292929] hover:bg-[#424242] border border-[#424242]">
                                <td className="px-6 py-4 whitespace-nowrap text-gray-100">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-100">
                                    <a
                                        href={`https://${item.website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        {item.website}
                                    </a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-100">{item.team}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-100">{item.country}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TabelUsers;
