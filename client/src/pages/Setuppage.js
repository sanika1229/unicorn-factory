// client/src/pages/Setuppage.js
import { useParams } from "react-router-dom";
import { useState } from "react";

function SetupPage() {
  const { id } = useParams();
  const [tokenCount, setTokenCount] = useState("");
  const [price, setPrice] = useState("");

  const handleSave = () => {
    const setupData = JSON.parse(localStorage.getItem("tokenSetup") || "{}");
    setupData[id] = { tokenCount, price };
    localStorage.setItem("tokenSetup", JSON.stringify(setupData));

    alert("✅ Token setup saved!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <h1 className="text-3xl font-bold mb-6">💸 Setup Token Sale</h1>
      <div className="bg-white text-black p-6 rounded-lg shadow-md w-full max-w-md">
        <input
          type="number"
          placeholder="Total Tokens"
          value={tokenCount}
          onChange={(e) => setTokenCount(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Price per Token"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
          onClick={handleSave}
        >
          Save Token Settings
        </button>
      </div>
    </div>
  );
}

export default SetupPage;
