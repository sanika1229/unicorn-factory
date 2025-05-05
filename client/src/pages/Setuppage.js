// client/src/pages/Setuppage.js

import { useParams } from "react-router-dom";
import { useState } from "react";

function SetupPage() {
  const { id } = useParams();
  const [price, setPrice] = useState("");
  const [supply, setSupply] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const tokenInfo = {
      projectId: id,
      price,
      supply,
    };

    console.log("🪙 Token setup submitted:", tokenInfo);
    alert("✅ Token setup saved (just a demo, not stored in DB yet).");

    // reset
    setPrice("");
    setSupply("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
      <h2 className="text-3xl font-bold mb-6">🪙 Set Up Your Token</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md text-black w-full max-w-md"
      >
        <label className="block mb-2 font-semibold">Token Price (in units):</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <label className="block mb-2 font-semibold">Total Token Supply:</label>
        <input
          type="number"
          value={supply}
          onChange={(e) => setSupply(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded w-full"
        >
          Save Token Info
        </button>
      </form>
    </div>
  );
}

export default SetupPage;
