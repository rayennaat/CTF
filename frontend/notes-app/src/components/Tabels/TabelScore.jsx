import React from "react";
import Blood from "../../assets/images/blood.png";

const TabelScore = () => {
    const tableItems = [
        {
            name: "Liam James",
            website: "liamjames.com",
            country: "Tunisia",
            firstBlood: 5, // Number of tasks solved first
        },
        {
            name: "Olivia Emma",
            website: "oliviaemma.io",
            country: "Tunisia",
            firstBlood: 0, // No first bloods
        },
        {
            name: "William Benjamin",
            website: "williambenjamin.dev",
            country: "UK",
            firstBlood: 2,
        },
        {
            name: "Henry Theodore",
            website: "henrytheodore.tech",
            country: "Palestine",
            firstBlood: 0,
        },
        {
            name: "Amelia Elijah",
            website: "ameliaelijah.org",
            country: "Germany",
            firstBlood: 3,
        },
    ];

    return (
        <div className="max-w-screen-3xl mx-auto px-4 md:px-1">
            <div className="mt-12 shadow-sm border border-[#424242] rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-transparent text-gray-100 font-medium border border-[#424242]">
                        <tr>
                            <th className="py-3 px-6">Rank</th>
                            <th className="py-3 px-6">Team</th>
                            <th className="py-3 px-6">Website</th>
                            <th className="py-3 px-6">Country</th>
                            <th className="py-3 px-6">First Blood</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {tableItems.map((item, idx) => (
                            <tr
                                key={idx}
                                className="bg-[#292929] hover:bg-[#424242] border border-[#424242]"
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-gray-100">
                                    {idx + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-100">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <a
                                        href={`https://${item.website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        {item.website}
                                    </a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                                    {item.country}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                                    {item.firstBlood > 0 && (
                                        <div className="flex items-center gap-1">
                                            <img
                                                src={Blood}
                                                alt="First Blood"
                                                className="w-5 h-6"
                                            />
                                            <span>{item.firstBlood}</span>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TabelScore;