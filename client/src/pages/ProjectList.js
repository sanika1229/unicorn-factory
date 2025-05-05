// client/src/pages/ProjectList.js
import { useEffect, useState } from "react";
import axios from "axios";

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 to-pink-500 text-white p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">🦄 Submitted Projects</h2>
      <div className="space-y-4 max-w-2xl mx-auto">
        {projects.map((proj) => (
          <div key={proj._id} className="bg-white text-black rounded p-4 shadow">
            <h3 className="font-semibold text-xl">{proj.name}</h3>
            <p>{proj.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectList;
