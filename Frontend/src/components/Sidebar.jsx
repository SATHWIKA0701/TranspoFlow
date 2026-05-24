import { useState } from "react";
import {
  LayoutDashboard,
  Truck,
  Users,
  Package,
  Menu,
  X, 
  CalendarDays,
  BarChart3,
  Settings,
  MapPinned
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Vehicles", path: "/vehicles", icon: Truck },
  { title: "Drivers", path: "/drivers", icon: Users },
  { title: "Deliveries", path: "/deliveries", icon: Package },
  { title: "Tracking", path: "/tracking", icon: MapPinned },
  { title: "Schedule", path: "/schedule", icon: CalendarDays },
  { title: "Reports", path: "/reports", icon: BarChart3 },
  { title: "Settings", path: "/settings", icon: Settings }
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const sidebarContent = (
    <>
      <h1 className="text-3xl font-bold mb-10 text-center">
        TranspoFlow
      </h1>

      <div className="space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? "bg-blue-600" : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={22} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </div>
    </>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-slate-900 text-white p-3 rounded-xl shadow-lg"
      >
        <Menu size={22} />
      </button>

      <motion.aside
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden lg:block fixed left-0 top-0 h-screen w-72 bg-slate-950 text-white p-5 shadow-2xl border-r border-white/10"
      >
        {sidebarContent}
      </motion.aside>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-black/50"
          >
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="w-72 min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 text-white p-5 shadow-2xl"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 bg-white/10 p-2 rounded-lg"
              >
                <X size={20} />
              </button>

              {sidebarContent}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;