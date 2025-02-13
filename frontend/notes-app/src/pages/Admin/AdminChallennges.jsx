import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function AdminChallenges() {
  const [active, setActive] = useState("Main");
  const [showCreateForm, setShowCreateForm] = useState(false); // Toggle create form
  const [challenges, setChallenges] = useState([]); // Store challenges
  // Form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [points, setPoints] = useState("");
  const [description, setDescription] = useState("");
  const [hint, setHint] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null); // Store any errors
  const [successMessage, setSuccessMessage] = useState(null); // Store success message

  // Handle form submission
  const handleCreateChallenge = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("points", points);
    formData.append("description", description);
    if (hint) formData.append("hint", hint);
    if (file) formData.append("resource", file);

    try {
      const response = await fetch("http://localhost:5000/add-challenge", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create challenge");
      }

      const data = await response.json();
      console.log("Challenge created:", data.challenge);

      // Reset form fields
      setTitle("");
      setCategory("");
      setPoints("");
      setDescription("");
      setHint("");
      setFile(null);

      // Hide the form after submission
      setShowCreateForm(false);

      // Show success message
      setSuccessMessage(data.message);
    } catch (error) {
      console.error("Error creating challenge:", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar active={active} setActive={setActive} />
      <main className="flex-1 ml-64 p-10 flex flex-col items-center relative overflow-hidden gap-8">
        <h1 className="text-4xl md:text-6xl font-extrabold text-cyan-500 drop-shadow-md mb-4 text-center">
          Challenges
        </h1>
        {/* Create Challenge Button */}
        <button
          className="p-2 bg-cyan-500 hover:bg-cyan-600 rounded text-white font-semibold"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? "Hide Form" : "Create Challenge"}
        </button>
        {/* Success Message */}
        {successMessage && (
          <div className="p-4 bg-green-500 text-white rounded-lg mb-4">{successMessage}</div>
        )}
        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-500 text-white rounded-lg mb-4">{error}</div>
        )}
        {/* Create Challenge Form */}
        {showCreateForm && (
          <form
            onSubmit={handleCreateChallenge}
            className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-gray-300">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-300"
                  required
                />
              </div>
              {/* Category */}
              <div>
                <label className="block text-gray-300">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-300"
                  required
                >
                  <option value="" disabled>Select a category</option>
                  <option value="Web">Web</option>
                  <option value="Crypto">Crypto</option>
                  <option value="Forensics">Forensics</option>
                  <option value="Reverse Engineering">Reverse Engineering</option>
                </select>
              </div>
              {/* Points */}
              <div>
                <label className="block text-gray-300">Points</label>
                <input
                  type="number"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-300"
                  required
                />
              </div>
              {/* Description */}
              <div>
                <label className="block text-gray-300">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-300"
                  rows="4"
                  required
                />
              </div>
              {/* Hint (Optional) */}
              <div>
                <label className="block text-gray-300">Hint (Optional)</label>
                <input
                  type="text"
                  value={hint}
                  onChange={(e) => setHint(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-300"
                />
              </div>
              {/* File Upload (Optional) */}
              <div>
                <label className="block text-gray-300">Resource File (.rar/.zip) (Optional)</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-300"
                  accept=".rar,.zip"
                />
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full p-2 bg-cyan-500 hover:bg-cyan-600 rounded text-white font-semibold"
              >
                Create Challenge
              </button>
            </div>
          </form>
        )}
        {/* Challenges Table */}
        <div className="w-full max-w-4xl mt-8">
          <table className="w-full border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-800 text-gray-300">
                <th className="border border-gray-700 px-4 py-2">Id</th>
                <th className="border border-gray-700 px-4 py-2">Title</th>
                <th className="border border-gray-700 px-4 py-2">Category</th>
                <th className="border border-gray-700 px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {challenges.map((challenge) => (
                <tr key={challenge.id} className="bg-gray-700 text-gray-300 hover:bg-gray-600">
                  <td className="border border-gray-700 px-4 py-2">{challenge.id}</td>
                  <td className="border border-gray-700 px-4 py-2">{challenge.title}</td>
                  <td className="border border-gray-700 px-4 py-2">{challenge.category}</td>
                  <td className="border border-gray-700 px-4 py-2">{challenge.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}