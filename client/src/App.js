import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";



function App() {
  const [projects, setProjects] = useState([]);
  const [contributions, setContributions] = useState({});

  useEffect(() => {
    axios.get("https://unicorn-factory.onrender.com/api/projects/all")

      .then(res => setProjects(res.data))
      .catch(err => console.error("Error fetching projects:", err));
  }, []);

  const handleInputChange = (projectId, value) => {
    setContributions(prev => ({ ...prev, [projectId]: value }));
  };

  const handleBuy = (project, price) => {
    const amount = parseFloat(contributions[project._id] || 0);
    if (!amount || amount <= 0) return alert("Enter a valid amount!");

    const tokensBought = (amount / price).toFixed(2);

    const existing = JSON.parse(localStorage.getItem("myTokens")) || {};
    existing[project.name] = (parseFloat(existing[project.name]) || 0) + parseFloat(tokensBought);
    localStorage.setItem("myTokens", JSON.stringify(existing));

    const totalContributions = JSON.parse(localStorage.getItem("contributions")) || {};
    totalContributions[project.name] = (parseFloat(totalContributions[project.name]) || 0) + amount;
    localStorage.setItem("contributions", JSON.stringify(totalContributions));

    alert(`✅ You bought ${tokensBought} tokens of ${project.name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-blue-900 text-white p-6">
      <div className="flex flex-col items-center justify-center py-10">
        <h1 className="text-4xl font-bold mb-4">Welcome to Unicorn Factory 🦄</h1>
        <Link to="/submit" className="underline text-lg hover:text-gray-200 mb-2">
          🚀 Go Submit a Project
        </Link>
        <Link to="/my-tokens" className="underline text-md text-yellow-300 hover:text-yellow-200">
          💰 View My Tokens
        </Link>
        <Link to="/trade" className="underline text-md text-blue-200 hover:text-blue-100 mt-2">
          🔄 Trade Tokens
        </Link>
      </div>

      <div className="max-w-3xl mx-auto bg-[#161b22] text-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">📋 Submitted Startups</h2>

        {/* 🚀 Launch Zone */}
        <h2 className="text-xl font-semibold mb-2 text-yellow-400">🚀 Launch Zone</h2>
        {projects.filter((p) => {
          const contributions = JSON.parse(localStorage.getItem("contributions")) || {};
          return contributions[p.name] >= 100000;
        }).map((p) => (
          <div key={p._id} className="bg-yellow-200 text-black p-3 rounded mb-3 shadow-md">
            <strong>{p.name}</strong> has hit the funding cap and is ready to launch!

          </div>
        ))}

        {projects.length === 0 ? (
          <p>No projects yet.</p>
        ) : (
          <div className="space-y-6">
            {projects.map((project, index) => {
              const tokenPrice = 1 + index * 0.5;
              const tokensAllocated = (10 / tokenPrice).toFixed(2);
              const totalContributions = JSON.parse(localStorage.getItem("contributions")) || {};
              const currentContribution = totalContributions[project.name] || 0;
              const isBreakout = currentContribution >= 100000;

              return (
                <div key={project._id} className="border-b border-gray-600 pb-6">
                  {isBreakout && (
                    <p className="text-sm font-bold text-red-400 mt-1">🚀 Breakout Project!</p>
                  )}
                  <h3 className="text-xl font-bold">{project.name}</h3>
                  <p className="text-sm">{project.description}</p>
                  <p className="text-sm mt-1 text-green-400">
                    🪙 Price: {tokenPrice} | Tokens (for 10 units): {tokensAllocated}
                  </p>

                  <div className="mt-2">
                    <input
                      type="number"
                      min="1"
                      placeholder="Amount to contribute"
                      className="border rounded px-2 py-1 w-48 text-black"
                      value={contributions[project._id] || ""}
                      onChange={(e) => handleInputChange(project._id, e.target.value)}
                    />
                    <button
                      className="bg-yellow-400 px-3 py-1 ml-2 rounded font-medium text-black hover:bg-yellow-300"
                      onClick={() => handleBuy(project, tokenPrice)}
                    >
                      Buy Tokens
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
