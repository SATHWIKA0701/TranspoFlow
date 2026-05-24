import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import api from "../api/api";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";

const Schedule = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [date, setDate] = useState("");

  const loadDeliveries = async () => {
    const { data } = await api.get("/deliveries");
    setDeliveries(data);
  };

  useEffect(() => {
    loadDeliveries();
  }, []);

  const filtered = deliveries.filter((delivery) => {
    if (!date) return true;
    return delivery.scheduledDate?.slice(0, 10) === date;
  });

  const today = new Date().toISOString().slice(0, 10);

  const todayDeliveries = deliveries.filter((delivery) => delivery.scheduledDate?.slice(0, 10) === today);
  const delayedDeliveries = deliveries.filter((delivery) => delivery.status === "Delayed");

  return (
    <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">Delivery Schedule</h1>
        <p className="text-slate-500 mt-2">View today, upcoming, and delayed delivery plans.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <p className="text-slate-500">Today&apos;s Deliveries</p>
          <h2 className="text-3xl font-bold mt-2">{todayDeliveries.length}</h2>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <p className="text-slate-500">Total Scheduled</p>
          <h2 className="text-3xl font-bold mt-2">{deliveries.length}</h2>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <p className="text-slate-500">Delayed</p>
          <h2 className="text-3xl font-bold mt-2">{delayedDeliveries.length}</h2>
        </div>
      </div>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="bg-white border rounded-xl px-4 py-3 shadow outline-none focus:ring-2 focus:ring-blue-500"
      />

      {filtered.length === 0 ? (
        <EmptyState title="No Scheduled Deliveries" message="No deliveries found for selected date." icon={CalendarDays} />
      ) : (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-4">Shipment</th>
                  <th className="p-4">Route</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((delivery) => (
                  <tr key={delivery._id} className="border-t">
                    <td className="p-4 font-semibold">{delivery.shipmentId}</td>
                    <td className="p-4">{delivery.pickupLocation} → {delivery.destination}</td>
                    <td className="p-4">{delivery.scheduledDate?.slice(0, 10)}</td>
                    <td className="p-4"><StatusBadge status={delivery.priority} /></td>
                    <td className="p-4"><StatusBadge status={delivery.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Schedule;