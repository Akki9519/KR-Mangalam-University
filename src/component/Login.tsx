

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from '../assets/unnamed.png';
import { useNavigate } from "react-router-dom";

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({ email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post<{ token: string, profile: string, name: string }>("http://localhost:5000/api/v1/login", formData);
      alert("Login successful! 🎉");
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("profile", response.data.profile);
      navigate("/dashboard")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed. Try again!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className=" p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex flex-col items-center">
          <img src={image} alt="Logo" className="w-24 h-24 mb-4 rounded-full shadow-md" />
          <h2 className="text-2xl font-semibold text-center font-serif text-[#1D56A5] mb-6">Login to Your Account
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 cursor-pointer font-semibold rounded-sm text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#1D56A5] hover:bg-[#1D56A5]"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Not registered?</span>{" "}
            <span
              className="text-[#1D56A5] font-semibold  cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Create an account
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
