import { Link } from "react-router-dom";

function HomePage() {
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
    </div>
  );
}

export default HomePage;
