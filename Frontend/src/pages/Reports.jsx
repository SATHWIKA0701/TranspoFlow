import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/api";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";

const Reports = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const loadReports = async () => {
    const [deliveryRes, vehicleRes, driverRes] = await Promise.all([
      api.get("/deliveries"),
      api.get("/vehicles"),
      api.get("/drivers")
    ]);

    setDeliveries(deliveryRes.data);
    setVehicles(vehicleRes.data);
    setDrivers(driverRes.data);
  };

  useEffect(() => {
    loadReports();
  }, []);

  const completed = deliveries.filter((d) => d.status === "Delivered").length;
  const delayed = deliveries.filter((d) => d.status === "Delayed").length;
  const completionRate = deliveries.length ? Math.round((completed / deliveries.length) * 100) : 0;

  const priorityData = ["Low", "Medium", "High", "Critical"].map((priority) => ({
    name: priority,
    value: deliveries.filter((d) => d.priority === priority).length
  }));

  const availabilityData = [
    { name: "Vehicles Available", value: vehicles.filter((v) => v.status === "Available").length },
    { name: "Drivers Available", value: drivers.filter((d) => d.availability === "Available").length }
  ];

  const COLORS = ["#64748b", "#2563eb", "#f59e0b", "#ef4444"];

  return (
    <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">Reports & Analytics</h1>
        <p className="text-slate-500 mt-2">Operational insights for manufacturing logistics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <p className="text-slate-500">Total Deliveries</p>
          <h2 className="text-3xl font-bold">{deliveries.length}</h2>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <p className="text-slate-500">Completion Rate</p>
          <h2 className="text-3xl font-bold">{completionRate}%</h2>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <p className="text-slate-500">Delayed Deliveries</p>
          <h2 className="text-3xl font-bold">{delayed}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-5">Priority-wise Shipments</h2>
          <div className="h-96 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={priorityData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-5">Availability Overview</h2>
          <div className="h-96 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <PieChart>
                <Pie data={availabilityData} dataKey="value" outerRadius={120} label>
                  {availabilityData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Reports;