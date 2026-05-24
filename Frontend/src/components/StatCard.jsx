import { motion } from "framer-motion";

const StatCard = ({ title, value, icon: Icon, color }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-500 text-sm">{title}</p>

          <h2 className="text-3xl font-bold mt-2 text-slate-800">
            {value}
          </h2>
        </div>

        <div className={`${color} p-4 rounded-2xl text-white shadow-lg`}>
          <Icon size={28} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;