import { useEffect, useState } from "react";
import {
  Bell,
  LogOut,
  Clock3
} from "lucide-react";

import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-xl shadow-md px-4 md:px-6 py-4 flex justify-between items-center border-b border-white/30 sticky top-0 z-40"
    >
      <div>
        <h2 className="text-lg md:text-2xl font-bold text-slate-800">
          Smart Transport Management
        </h2>

        <p className="text-slate-500 text-sm md:text-base hidden sm:block">
          Manage logistics operations efficiently
        </p>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <div className="hidden md:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl">
          <Clock3 size={18} className="text-slate-600" />

          <span className="text-sm font-medium text-slate-700">
            {time}
          </span>
        </div>

        <motion.div
          whileHover={{ scale: 1.08 }}
          className="relative cursor-pointer"
        >
          <Bell className="text-slate-600" size={22} />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </motion.div>

        <div className="hidden sm:flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-lg">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="text-right">
            <p className="font-semibold text-slate-800">
              {user?.name}
            </p>

            <p className="text-sm text-slate-500 capitalize">
              {user?.role}
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-xl transition shadow-lg"
        >
          <LogOut size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Navbar;