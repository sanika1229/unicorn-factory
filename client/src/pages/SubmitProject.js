import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SubmitProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://unicorn-factory.onrender.com/api/projects", {

        name,
        description,
      });

      alert("Project submitted successfully!");
      const projectId = res.data._id || res.data.id;
      navigate(`/setup/${projectId}`); // 👈 Redirect to token setup

      setName("");
      setDescription("");
    } catch (err) {
      alert("Submission failed.");
      console.error("❌ Error submitting project:", err?.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 to-pink-500 flex flex-col items-center justify-center text-white">
      <h2 className="text-3xl font-bold mb-6">Submit Your AI Startup 🚀</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md text-black w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SubmitProject;
