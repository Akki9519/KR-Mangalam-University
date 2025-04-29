import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constant/constant";
import image from '../assets/unnamed.png';
import { useNavigate } from "react-router-dom";

const SimpleForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !profileImage) {
      setError("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profileImage", profileImage);

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response, "response");

      alert("User registered successfully!");
      setName("");
      setEmail("");
      setPassword("");
      setProfileImage(null);
      setError("");
      navigate("/"); 
    } catch {
      setError("Error registering user");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-sm shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={image} alt="Logo" className="w-24 h-24 object-cover rounded-full" />
        </div>
        <h2 className="text-2xl font-semibold text-center font-serif text-[#1D56A5] mb-6">Register to Get Started
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div>
            <label className="block text-gray-700 font-medium ">Upload Photo</label>
          <input
            type="file"
            placeholder="Upload Photo"
            onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
            className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          </div>
          <button
            type="submit"
            className="w-full bg-[#1D56A5] hover:bg-[#1D56A5] cursor-pointer text-white font-semibold py-2 rounded-sm transition duration-300"
          >
            Register
          </button>
          <div className="text-sm text-gray-600 text-center mt-4">
            Already Registered?{" "}
            <span
              className="text-[#1D56A5] font-semibold cursor-pointer"
              onClick={() => navigate("/")}
            >
              Please Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SimpleForm;
