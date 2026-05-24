import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  Plus,
  Trash2,
  Truck,
  Search,
  Pencil
} from "lucide-react";

import api from "../api/api";
import Modal from "../components/Modal";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";

const initialForm = {
  vehicleNumber: "",
  type: "",
  capacity: "",
  status: "Available",
  fuelType: "Diesel",
  lastServiceDate: ""
};

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [formData, setFormData] = useState(initialForm);

  const [editingVehicle, setEditingVehicle] = useState(null);

  const loadVehicles = async () => {
    try {
      const { data } = await api.get("/vehicles");
      setVehicles(data);
    } catch {
      toast.error("Failed to load vehicles");
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const createVehicle = async (e) => {
    e.preventDefault();

    try {
      await api.post("/vehicles", formData);

      toast.success("Vehicle added successfully");

      setFormData(initialForm);

      loadVehicles();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add vehicle"
      );
    }
  };

  const updateVehicle = async (e) => {
    e.preventDefault();

    try {
      await api.put(
        `/vehicles/${editingVehicle._id}`,
        formData
      );

      toast.success("Vehicle updated");

      setEditingVehicle(null);
      setFormData(initialForm);

      loadVehicles();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update vehicle"
      );
    }
  };

  const deleteVehicle = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/vehicles/${id}`);

      toast.success("Vehicle deleted");

      loadVehicles();
    } catch {
      toast.error("Failed to delete vehicle");
    }
  };

  const startEdit = (vehicle) => {
    setEditingVehicle(vehicle);

    setFormData({
      vehicleNumber: vehicle.vehicleNumber || "",
      type: vehicle.type || "",
      capacity: vehicle.capacity || "",
      status: vehicle.status || "Available",
      fuelType: vehicle.fuelType || "Diesel",
      lastServiceDate: vehicle.lastServiceDate
        ? vehicle.lastServiceDate.slice(0, 10)
        : ""
    });
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      `${vehicle.vehicleNumber} ${vehicle.type}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus = statusFilter
      ? vehicle.status === statusFilter
      : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Vehicle Fleet
        </h1>

        <p className="text-slate-500 mt-2">
          Manage logistics vehicles and fleet availability.
        </p>
      </div>

      <motion.form
        onSubmit={createVehicle}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-6 gap-4"
      >
        <input
          name="vehicleNumber"
          placeholder="Vehicle Number"
          value={formData.vehicleNumber}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          name="type"
          placeholder="Type"
          value={formData.type}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          name="capacity"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Available</option>
          <option>Assigned</option>
          <option>Maintenance</option>
        </select>

        <select
          name="fuelType"
          value={formData.fuelType}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Diesel</option>
          <option>Petrol</option>
          <option>CNG</option>
          <option>Electric</option>
          <option>Hybrid</option>
        </select>

        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center gap-2 font-semibold transition py-3 shadow-lg">
          <Plus size={18} />
          Add Vehicle
        </button>
      </motion.form>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-96">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search vehicles..."
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
          <option value="Available">Available</option>
          <option value="Assigned">Assigned</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      {filteredVehicles.length === 0 ? (
        <EmptyState
          title="No Vehicles Found"
          message="Add vehicles to start managing fleet operations."
          icon={Truck}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle._id}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-2xl transition"
            >
              <div className="flex justify-between items-start">
                <div className="bg-blue-100 text-blue-700 p-4 rounded-2xl">
                  <Truck size={28} />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(vehicle)}
                    className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => deleteVehicle(vehicle._id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <h2 className="text-2xl font-bold mt-5 text-slate-800">
                {vehicle.vehicleNumber}
              </h2>

              <p className="text-slate-500 mt-1">
                {vehicle.type}
              </p>

              <div className="mt-5 space-y-3">
                <p className="text-slate-600">
                  Capacity: {vehicle.capacity}
                </p>

                <p className="text-slate-600">
                  Fuel: {vehicle.fuelType}
                </p>

                <StatusBadge status={vehicle.status} />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {editingVehicle && (
        <Modal
          title="Edit Vehicle"
          onClose={() => {
            setEditingVehicle(null);
            setFormData(initialForm);
          }}
        >
          <form
            onSubmit={updateVehicle}
            className="space-y-4"
          >
            <input
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              placeholder="Vehicle Number"
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Type"
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="Capacity"
              className="w-full border rounded-xl px-4 py-3"
            />

            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold">
              Update Vehicle
            </button>
          </form>
        </Modal>
      )}
    </motion.div>
  );
};

export default Vehicles;