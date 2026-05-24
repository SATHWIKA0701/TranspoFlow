import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
  const { user } = useAuth();

  return (
    <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">Settings</h1>
        <p className="text-slate-500 mt-2">Profile, preferences, and project information.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-5">Profile</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <p className="text-xl font-bold">{user?.name}</p>
              <p className="text-slate-500">{user?.email}</p>
              <p className="text-slate-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-5">Preferences</h2>
          {["Email notifications", "Compact dashboard", "Auto refresh reports"].map((item) => (
            <label key={item} className="flex justify-between items-center py-3 border-b">
              <span className="text-slate-700">{item}</span>
              <input type="checkbox" className="w-5 h-5" defaultChecked={item === "Email notifications"} />
            </label>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;