import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "manager"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(formData);

      toast.success("Account created successfully");

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 text-white"
      >
        <h1 className="text-4xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-center text-blue-100 mb-8">
          Start managing transport operations
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/20 outline-none placeholder:text-blue-100 focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/20 outline-none placeholder:text-blue-100 focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/20 outline-none placeholder:text-blue-100 focus:ring-2 focus:ring-indigo-500"
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/20 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option className="text-black" value="manager">
              Manager
            </option>

            <option className="text-black" value="admin">
              Admin
            </option>

            <option className="text-black" value="staff">
              Staff
            </option>
          </select>

          <button className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 font-semibold shadow-lg hover:scale-[1.02]">
            Register
          </button>
        </form>

        <p className="text-center mt-6 text-blue-100">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white font-semibold underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Register;