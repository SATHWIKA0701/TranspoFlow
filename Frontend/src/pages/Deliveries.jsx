import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  Plus,
  Trash2,
  PackageCheck,
  Search,
  Pencil
} from "lucide-react";

import api from "../api/api";
import Modal from "../components/Modal";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";

const initialForm = {
  shipmentId: "",
  materialName: "",
  pickupLocation: "",
  destination: "",
  priority: "Medium",
  status: "Pending",
  assignedVehicle: "",
  assignedDriver: "",
  scheduledDate: "",
  expectedDeliveryDate: "",
  notes: ""
};

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [formData, setFormData] = useState(initialForm);
  const [editingDelivery, setEditingDelivery] = useState(null);

  const loadData = async () => {
    try {
      const [deliveryRes, vehicleRes, driverRes] = await Promise.all([
        api.get("/deliveries"),
        api.get("/vehicles"),
        api.get("/drivers")
      ]);

      setDeliveries(deliveryRes.data);
      setVehicles(vehicleRes.data);
      setDrivers(driverRes.data);
    } catch {
      toast.error("Failed to load delivery data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const createDelivery = async (e) => {
    e.preventDefault();

    try {
      await api.post("/deliveries", formData);

      toast.success("Delivery scheduled successfully");

      setFormData(initialForm);
      loadData();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create delivery"
      );
    }
  };

  const updateDelivery = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/deliveries/${editingDelivery._id}`, formData);

      toast.success("Delivery updated");

      setEditingDelivery(null);
      setFormData(initialForm);

      loadData();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update delivery"
      );
    }
  };

  const deleteDelivery = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this delivery?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/deliveries/${id}`);

      toast.success("Delivery deleted");

      loadData();
    } catch {
      toast.error("Failed to delete delivery");
    }
  };

  const startEdit = (delivery) => {
    setEditingDelivery(delivery);

    setFormData({
      shipmentId: delivery.shipmentId || "",
      materialName: delivery.materialName || "",
      pickupLocation: delivery.pickupLocation || "",
      destination: delivery.destination || "",
      priority: delivery.priority || "Medium",
      status: delivery.status || "Pending",
      assignedVehicle:
        delivery.assignedVehicle?._id ||
        delivery.vehicle?._id ||
        "",
      assignedDriver:
        delivery.assignedDriver?._id ||
        delivery.driver?._id ||
        "",
      scheduledDate: delivery.scheduledDate
        ? delivery.scheduledDate.slice(0, 10)
        : "",
      expectedDeliveryDate: delivery.expectedDeliveryDate
        ? delivery.expectedDeliveryDate.slice(0, 10)
        : "",
      notes: delivery.notes || ""
    });
  };

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch =
      `${delivery.shipmentId} ${delivery.materialName} ${delivery.pickupLocation} ${delivery.destination}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus = statusFilter
      ? delivery.status === statusFilter
      : true;

    const matchesPriority = priorityFilter
      ? delivery.priority === priorityFilter
      : true;

    const matchesDate = dateFilter
      ? delivery.scheduledDate?.slice(0, 10) === dateFilter
      : true;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesDate
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Delivery Scheduling
        </h1>

        <p className="text-slate-500 mt-2">
          Create shipments, assign resources, and monitor transport status.
        </p>
      </div>

      <motion.form
        onSubmit={createDelivery}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <input
          name="shipmentId"
          placeholder="Shipment ID"
          value={formData.shipmentId}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          name="materialName"
          placeholder="Material Name"
          value={formData.materialName}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          name="pickupLocation"
          placeholder="Pickup Location"
          value={formData.pickupLocation}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Pending</option>
          <option>Dispatched</option>
          <option>In Transit</option>
          <option>Delivered</option>
          <option>Delayed</option>
        </select>

        <select
          name="assignedVehicle"
          value={formData.assignedVehicle}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Vehicle</option>

          {vehicles.map((vehicle) => (
            <option key={vehicle._id} value={vehicle._id}>
              {vehicle.vehicleNumber}
            </option>
          ))}
        </select>

        <select
          name="assignedDriver"
          value={formData.assignedDriver}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Driver</option>

          {drivers.map((driver) => (
            <option key={driver._id} value={driver._id}>
              {driver.name}
            </option>
          ))}
        </select>

        <input
          name="scheduledDate"
          type="date"
          value={formData.scheduledDate}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          name="expectedDeliveryDate"
          type="date"
          value={formData.expectedDeliveryDate}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 md:col-span-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center gap-2 font-semibold transition py-3 shadow-lg">
          <Plus size={18} />
          Schedule Delivery
        </button>
      </motion.form>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search deliveries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border rounded-xl px-4 py-3 shadow outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Dispatched">Dispatched</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
          <option value="Delayed">Delayed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="bg-white border rounded-xl px-4 py-3 shadow outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="bg-white border rounded-xl px-4 py-3 shadow outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredDeliveries.length === 0 ? (
        <EmptyState
          title="No Deliveries Found"
          message="Create delivery schedules to manage logistics flow."
          icon={PackageCheck}
        />
      ) : (
        <div className="space-y-5">
          {filteredDeliveries.map((delivery, index) => (
            <motion.div
              key={delivery._id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-2xl transition"
            >
              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-700 p-4 rounded-2xl">
                    <PackageCheck size={30} />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      {delivery.shipmentId} - {delivery.materialName}
                    </h2>

                    <p className="text-slate-500 mt-1">
                      {delivery.pickupLocation} → {delivery.destination}
                    </p>

                    <p className="text-slate-500 mt-1">
                      Vehicle:{" "}
                      {delivery.assignedVehicle?.vehicleNumber ||
                        delivery.vehicle?.vehicleNumber ||
                        "Not assigned"}{" "}
                      | Driver:{" "}
                      {delivery.assignedDriver?.name ||
                        delivery.driver?.name ||
                        "Not assigned"}
                    </p>

                    <p className="text-slate-500 mt-1">
                      Scheduled:{" "}
                      {delivery.scheduledDate?.slice(0, 10)}
                      {delivery.expectedDeliveryDate &&
                        ` | Expected: ${delivery.expectedDeliveryDate.slice(
                          0,
                          10
                        )}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <StatusBadge status={delivery.priority} />

                  <StatusBadge status={delivery.status} />

                  <button
                    onClick={() => startEdit(delivery)}
                    className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => deleteDelivery(delivery._id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {editingDelivery && (
        <Modal
          title="Edit Delivery"
          onClose={() => {
            setEditingDelivery(null);
            setFormData(initialForm);
          }}
        >
          <form onSubmit={updateDelivery} className="space-y-4 pd-4">
            <input
              name="shipmentId"
              value={formData.shipmentId}
              onChange={handleChange}
              placeholder="Shipment ID"
              className="w-full border rounded-xl px-4 py-3"
              required
            />

            <input
              name="materialName"
              value={formData.materialName}
              onChange={handleChange}
              placeholder="Material Name"
              className="w-full border rounded-xl px-4 py-3"
              required
            />

            <input
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              placeholder="Pickup Location"
              className="w-full border rounded-xl px-4 py-3"
              required
            />

            <input
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Destination"
              className="w-full border rounded-xl px-4 py-3"
              required
            />

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option>Pending</option>
              <option>Dispatched</option>
              <option>In Transit</option>
              <option>Delivered</option>
              <option>Delayed</option>
            </select>

            <select
              name="assignedVehicle"
              value={formData.assignedVehicle}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="">No Vehicle Assigned</option>

              {vehicles.map((vehicle) => (
                <option key={vehicle._id} value={vehicle._id}>
                  {vehicle.vehicleNumber}
                </option>
              ))}
            </select>

            <select
              name="assignedDriver"
              value={formData.assignedDriver}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="">No Driver Assigned</option>

              {drivers.map((driver) => (
                <option key={driver._id} value={driver._id}>
                  {driver.name}
                </option>
              ))}
            </select>

            <input
              name="scheduledDate"
              type="date"
              value={formData.scheduledDate}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
              required
            />

            <input
              name="expectedDeliveryDate"
              type="date"
              value={formData.expectedDeliveryDate}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Notes"
              className="w-full border rounded-xl px-4 py-3"
            />

            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold">
              Update Delivery
            </button>
          </form>
        </Modal>
      )}
    </motion.div>
  );
};

export default Deliveries;