import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TradeTokens() {
  const [tokens, setTokens] = useState({});
  const [sellAmounts, setSellAmounts] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("myTokens")) || {};
    setTokens(stored);
  }, []);

  const handleSellChange = (name, value) => {
    setSellAmounts((prev) => ({ ...prev, [name]: value }));
  };

  const handleSell = (name) => {
    const amountToSell = parseFloat(sellAmounts[name] || 0);
    const current = parseFloat(tokens[name] || 0);

    if (amountToSell <= 0 || amountToSell > current) {
      return alert("❌ Invalid sell amount!");
    }

    const updated = { ...tokens, [name]: current - amountToSell };
    localStorage.setItem("myTokens", JSON.stringify(updated));
    setTokens(updated);
    setSellAmounts({ ...sellAmounts, [name]: "" });

    alert(`✅ You sold ${amountToSell} tokens of ${name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-blue-900 text-white p-6">
      <div className="flex flex-col items-center justify-center py-6">
        <h1 className="text-3xl font-bold mb-4">🔄 Token Trading Desk</h1>
        <Link to="/" className="text-sm underline hover:text-gray-300 mb-6">
          ← Back to Home
        </Link>
      </div>

      <div className="max-w-2xl mx-auto bg-[#161b22] p-6 rounded-lg shadow-md">
        {Object.keys(tokens).length === 0 ? (
          <p>You have no tokens to trade.</p>
        ) : (
          Object.entries(tokens).map(([name, amount]) => (
            <div key={name} className="mb-4 border-b border-gray-700 pb-4">
              <p className="font-semibold">{name} — {amount.toFixed(2)} tokens</p>
              <div className="flex items-center mt-2">
                <input
                  type="number"
                  min="0"
                  placeholder="Amount to sell"
                  className="border rounded px-2 py-1 w-40 text-black"
                  value={sellAmounts[name] || ""}
                  onChange={(e) => handleSellChange(name, e.target.value)}
                />
                <button
                  className="bg-red-500 text-white px-3 py-1 ml-2 rounded hover:bg-red-400"
                  onClick={() => handleSell(name)}
                >
                  Sell
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TradeTokens;
