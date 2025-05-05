import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Trade() {
  const [tokens, setTokens] = useState({});
  const [sellAmounts, setSellAmounts] = useState({});
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const storedTokens = JSON.parse(localStorage.getItem("myTokens")) || {};
    setTokens(storedTokens);
  }, []);

  const handleInputChange = (project, value) => {
    setSellAmounts(prev => ({ ...prev, [project]: value }));
  };

  const handleSell = (project) => {
    const amount = parseFloat(sellAmounts[project] || 0);
    if (!amount || amount <= 0) return;

    const current = parseFloat(tokens[project] || 0);
    if (amount > current) {
      setMessages(prev => ({ ...prev, [project]: "❌ Not enough tokens!" }));
      return;
    }

    const newAmount = current - amount;
    const updated = { ...tokens, [project]: newAmount };
    localStorage.setItem("myTokens", JSON.stringify(updated));
    setTokens(updated);
    setMessages(prev => ({ ...prev, [project]: `✅ Sold ${amount} tokens.` }));
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <div className="flex flex-col items-center justify-center py-8">
        <h1 className="text-3xl font-bold mb-4">🔄 Trade Tokens</h1>
        <Link to="/" className="text-blue-300 underline hover:text-blue-200 mb-6">
          ← Back to Home
        </Link>
      </div>

      {Object.keys(tokens).length === 0 ? (
        <p className="text-center text-gray-300">No tokens available for trading.</p>
      ) : (
        <div className="max-w-2xl mx-auto bg-white text-black rounded-lg p-6 shadow-md">
          {Object.entries(tokens).map(([project, amount]) => (
            <div key={project} className="border-b border-gray-300 py-4">
              <h2 className="text-xl font-semibold">{project}</h2>
              <p className="text-sm text-gray-700 mb-2">Owned: {amount} 🪙</p>

              <input
                type="number"
                min="1"
                placeholder="Amount to sell"
                className="border rounded px-2 py-1 w-48 text-black"
                value={sellAmounts[project] || ""}
                onChange={(e) => handleInputChange(project, e.target.value)}
              />
              <button
                className="bg-red-400 px-3 py-1 ml-2 rounded font-medium text-black hover:bg-red-300"
                onClick={() => handleSell(project)}
              >
                Sell
              </button>

              {messages[project] && (
                <p className="text-sm text-green-700 mt-1">{messages[project]}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Trade;
