import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, MapPinned } from "lucide-react";
import api from "../api/api";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";

const steps = [
  "Shipment Created",
  "Vehicle Assigned",
  "Dispatched",
  "In Transit",
  "Reached Destination",
  "Delivered"
];

const getProgress = (delivery) => {
  if (delivery.status === "Delivered") return 6;
  if (delivery.status === "In Transit") return 4;
  if (delivery.status === "Dispatched") return 3;
  if (delivery.vehicle || delivery.driver || delivery.assignedVehicle || delivery.assignedDriver) return 2;
  return 1;
};

const Tracking = () => {
  const [deliveries, setDeliveries] = useState([]);

  const loadDeliveries = async () => {
    const { data } = await api.get("/deliveries");
    setDeliveries(data);
  };

  useEffect(() => {
    loadDeliveries();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">Shipment Tracking</h1>
        <p className="text-slate-500 mt-2">Visual workflow timeline for transport movement.</p>
      </div>

      {deliveries.length === 0 ? (
        <EmptyState title="No Shipments To Track" message="Create deliveries to see tracking timelines." icon={MapPinned} />
      ) : (
        <div className="space-y-6">
          {deliveries.map((delivery) => {
            const progress = getProgress(delivery);

            return (
              <motion.div key={delivery._id} whileHover={{ y: -4 }} className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      {delivery.shipmentId} - {delivery.materialName}
                    </h2>
                    <p className="text-slate-500 mt-1">
                      {delivery.pickupLocation} → {delivery.destination}
                    </p>
                  </div>
                  <StatusBadge status={delivery.status} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                  {steps.map((step, index) => {
                    const done = index + 1 <= progress;

                    return (
                      <div key={step} className="flex md:flex-col items-center gap-3">
                        {done ? (
                          <CheckCircle2 className="text-emerald-600" size={28} />
                        ) : (
                          <Circle className="text-slate-300" size={28} />
                        )}

                        <p className={`text-sm font-medium text-center ${done ? "text-slate-800" : "text-slate-400"}`}>
                          {step}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default Tracking;