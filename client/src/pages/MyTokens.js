import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyTokens() {
  const [tokens, setTokens] = useState({});
  const [contributions, setContributions] = useState({});

  useEffect(() => {
    const storedTokens = JSON.parse(localStorage.getItem("myTokens")) || {};
    const storedContributions = JSON.parse(localStorage.getItem("contributions")) || {};
    setTokens(storedTokens);
    setContributions(storedContributions);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex flex-col items-center justify-center py-8">
        <h1 className="text-3xl font-bold mb-4">💰 Your Token Holdings</h1>
        <Link
          to="/"
          className="text-blue-300 underline hover:text-blue-200 mb-6"
        >
          ← Back to Home
        </Link>
      </div>

      {Object.keys(tokens).length === 0 ? (
        <p className="text-center text-gray-300">No tokens bought yet.</p>
      ) : (
        <div className="max-w-2xl mx-auto bg-white text-black rounded-lg p-6 shadow-md">
          {Object.entries(tokens).map(([project, amount]) => (
            <div
              key={project}
              className="border-b border-gray-300 py-3 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{project}</h2>
                <p className="text-sm text-gray-600">
                  Total Contributed: {contributions[project] || 0}
                </p>
              </div>
              <p className="text-lg font-bold text-green-700">
                {amount} 🪙 tokens
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTokens;
