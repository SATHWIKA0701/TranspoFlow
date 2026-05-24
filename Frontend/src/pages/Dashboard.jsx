import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/api";

import {
  Truck,
  Users,
  Package,
  Clock,
  Activity,
  Route,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  const loadDashboard = async () => {
    try {
      const { data } = await api.get("/dashboard/stats");
      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="h-40 bg-slate-200 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  const deliveryStatusData = [
    { name: "Pending", value: stats.pendingDeliveries },
    { name: "Dispatched", value: stats.dispatchedDeliveries },
    { name: "Transit", value: stats.inTransitDeliveries },
    { name: "Delivered", value: stats.deliveredDeliveries },
    { name: "Delayed", value: stats.delayedDeliveries }
  ];

  const vehicleUtilizationData =
  stats.vehicleUtilizationData?.some((item) => item.value > 0)
    ? stats.vehicleUtilizationData
    : [
        { name: "No Vehicles", value: 1 }
      ];

  const monthlyData = stats.monthlyData?.length
    ? stats.monthlyData
    : [{ month: "No Data", deliveries: 0 }];

  const COLORS = ["#f59e0b", "#6366f1", "#3b82f6", "#10b981", "#ef4444"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Logistics Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Monitor manufacturing transport operations in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <StatCard
          title="Total Vehicles"
          value={stats.totalVehicles}
          icon={Truck}
          color="bg-blue-600"
        />

        <StatCard
          title="Available Drivers"
          value={stats.availableDrivers}
          icon={Users}
          color="bg-green-600"
        />

        <StatCard
          title="Active Deliveries"
          value={stats.activeDeliveries}
          icon={Activity}
          color="bg-indigo-600"
        />

        <StatCard
          title="Pending Deliveries"
          value={stats.pendingDeliveries}
          icon={Clock}
          color="bg-orange-500"
        />

        <StatCard
          title="Completed Deliveries"
          value={stats.deliveredDeliveries}
          icon={CheckCircle2}
          color="bg-emerald-600"
        />

        <StatCard
          title="Delayed Deliveries"
          value={stats.delayedDeliveries}
          icon={AlertTriangle}
          color="bg-red-600"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/40"
        >
          <h2 className="text-2xl font-bold mb-6 text-slate-800">
            Delivery Status
          </h2>

          <div className="h-96 w-full min-w-0">
           <ResponsiveContainer width="99%" height={350}>
              <PieChart>
                <Pie
                  data={deliveryStatusData}
                  dataKey="value"
                  outerRadius={120}
                  label
                >
                  {deliveryStatusData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/40"
        >
          <h2 className="text-2xl font-bold mb-6 text-slate-800">
            Monthly Deliveries
          </h2>

          <div className="h-96 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="deliveries" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/40"
        >
          <h2 className="text-2xl font-bold mb-6 text-slate-800">
            Vehicle Utilization
          </h2>

          <div className="h-96 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <PieChart>
                <Pie
                  data={vehicleUtilizationData}
                  dataKey="value"
                  outerRadius={120}
                  label
                >
                  {vehicleUtilizationData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-5">
            Recent Deliveries
          </h2>

          <div className="space-y-4">
            {stats.recentDeliveries?.length === 0 ? (
              <p className="text-slate-500">No recent deliveries found.</p>
            ) : (
              stats.recentDeliveries?.map((delivery) => (
                <div
                  key={delivery._id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b pb-3"
                >
                  <div>
                    <p className="font-semibold text-slate-800">
                      {delivery.shipmentId} - {delivery.materialName}
                    </p>

                    <p className="text-sm text-slate-500">
                      {delivery.pickupLocation} → {delivery.destination}
                    </p>
                  </div>

                  <StatusBadge status={delivery.status} />
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-5">
            Priority Shipments
          </h2>

          <div className="space-y-4">
            {stats.priorityShipments?.length === 0 ? (
              <p className="text-slate-500">No high priority shipments.</p>
            ) : (
              stats.priorityShipments?.map((delivery) => (
                <div
                  key={delivery._id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b pb-3"
                >
                  <div>
                    <p className="font-semibold text-slate-800">
                      {delivery.shipmentId}
                    </p>

                    <p className="text-sm text-slate-500">
                      {delivery.materialName}
                    </p>
                  </div>

                  <StatusBadge status={delivery.priority} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="bg-blue-700 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/15 p-3 rounded-2xl">
            <Route size={28} />
          </div>

          <h2 className="text-3xl font-bold">
            Transport Efficiency
          </h2>
        </div>

        <p className="text-blue-100 leading-8">
          TranspoFlow helps manufacturing teams manage vehicle utilization,
          driver availability, delivery scheduling, and real-time shipment
          workflows from a centralized logistics dashboard.
        </p>
      </div>
    </motion.div>
  );
};

export default Dashboard;