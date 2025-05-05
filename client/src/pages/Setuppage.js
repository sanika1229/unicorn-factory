import { useParams } from "react-router-dom";

function SetupPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div>
        <h1 className="text-3xl font-bold mb-4">Token Setup for Project ID: {id}</h1>
        {/* Add form fields for token price, supply, etc. here */}
      </div>
    </div>
  );
}

export default SetupPage;
