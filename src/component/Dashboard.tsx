import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [profile, setProfile] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const navigate = useNavigate();

  const getToken = async () => {
    const storedToken = localStorage.getItem("token");
    const storedProfile = localStorage.getItem("profile");
    const storedName = localStorage.getItem("name");
    if (storedToken || storedProfile || storedName) {
      setProfile(storedProfile);
      setName(storedName);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const handleLogout = () => {
    alert("Logout Successfully")
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center w-full max-w-md relative">
        {profile ? (
          <img
            src={`http://localhost:5000/uploads/${profile}`}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-[#1D56A5] mb-4"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center mb-4">
            <span className="text-gray-500 text-2xl">No Image</span>
          </div>
        )}

        {name && (
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Welcome, {name}!
          </h2>
        )}

        <button
          onClick={handleLogout}
          className="mt-6 px-6 py-2 bg-[#1D56A5] text-white rounded-lg hover:bg-[#1D56A5] transition duration-300 ease-in-out shadow-md"
        >
          Log Out
        </button>

       
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-2 bg-[#1D56A5] rounded-full"></div>
      </div>
    </div>
  );
};

export default Dashboard;
