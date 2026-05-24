import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Plus, Trash2, UserRound, Search, Pencil } from "lucide-react";

import api from "../api/api";
import Modal from "../components/Modal";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";

const initialForm = {
  name: "",
  phone: "",
  licenseNumber: "",
  experience: "",
  availability: "Available",
  assignedVehicle: ""
};

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [formData, setFormData] = useState(initialForm);
  const [editingDriver, setEditingDriver] = useState(null);

  const loadData = async () => {
    try {
      const [driverRes, vehicleRes] = await Promise.all([
        api.get("/drivers"),
        api.get("/vehicles")
      ]);

      setDrivers(driverRes.data);
      setVehicles(vehicleRes.data);
    } catch {
      toast.error("Failed to load driver data");
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

  const createDriver = async (e) => {
    e.preventDefault();

    try {
      await api.post("/drivers", formData);
      toast.success("Driver added successfully");
      setFormData(initialForm);
      loadData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add driver");
    }
  };

  const updateDriver = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/drivers/${editingDriver._id}`, formData);
      toast.success("Driver updated");
      setEditingDriver(null);
      setFormData(initialForm);
      loadData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update driver");
    }
  };

  const deleteDriver = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this driver?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/drivers/${id}`);
      toast.success("Driver deleted");
      loadData();
    } catch {
      toast.error("Failed to delete driver");
    }
  };

  const startEdit = (driver) => {
    setEditingDriver(driver);

    setFormData({
      name: driver.name || "",
      phone: driver.phone || "",
      licenseNumber: driver.licenseNumber || "",
      experience: driver.experience || "",
      availability: driver.availability || "Available",
      assignedVehicle: driver.assignedVehicle?._id || ""
    });
  };

  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch = `${driver.name} ${driver.phone} ${driver.licenseNumber}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesAvailability = availabilityFilter
      ? driver.availability === availabilityFilter
      : true;

    return matchesSearch && matchesAvailability;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Driver Management
        </h1>
        <p className="text-slate-500 mt-2">
          Track driver availability, license records, and vehicle assignments.
        </p>
      </div>

      <motion.form
        onSubmit={createDriver}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-6 gap-4"
      >
        <input
          name="name"
          placeholder="Driver Name"
          value={formData.name}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          name="licenseNumber"
          placeholder="License No"
          value={formData.licenseNumber}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          name="experience"
          type="number"
          placeholder="Experience"
          value={formData.experience}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Available</option>
          <option>Assigned</option>
          <option>On Leave</option>
        </select>

        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center gap-2 font-semibold transition py-3 shadow-lg">
          <Plus size={18} />
          Add Driver
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
            placeholder="Search drivers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow"
          />
        </div>

        <select
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
          className="bg-white border rounded-xl px-4 py-3 shadow outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Availability</option>
          <option value="Available">Available</option>
          <option value="Assigned">Assigned</option>
          <option value="On Leave">On Leave</option>
        </select>
      </div>

      {filteredDrivers.length === 0 ? (
        <EmptyState
          title="No Drivers Found"
          message="Add drivers to manage transport assignments."
          icon={UserRound}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDrivers.map((driver, index) => (
            <motion.div
              key={driver._id}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-2xl transition"
            >
              <div className="flex justify-between items-start">
                <div className="bg-indigo-100 text-indigo-700 p-4 rounded-2xl">
                  <UserRound size={28} />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(driver)}
                    className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => deleteDriver(driver._id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <h2 className="text-2xl font-bold mt-5 text-slate-800">
                {driver.name}
              </h2>

              <p className="text-slate-500 mt-1">{driver.phone}</p>

              <p className="text-slate-500 mt-1">
                License: {driver.licenseNumber}
              </p>

              <p className="text-slate-500 mt-1">
                Assigned Vehicle:{" "}
                {driver.assignedVehicle?.vehicleNumber || "Not assigned"}
              </p>

              <div className="mt-5 flex justify-between items-center">
                <span className="text-slate-600 font-medium">
                  {driver.experience || 0} yrs exp
                </span>

                <StatusBadge status={driver.availability} />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {editingDriver && (
        <Modal
          title="Edit Driver"
          onClose={() => {
            setEditingDriver(null);
            setFormData(initialForm);
          }}
        >
          <form onSubmit={updateDriver} className="space-y-4">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Driver Name"
              className="w-full border rounded-xl px-4 py-3"
              required
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full border rounded-xl px-4 py-3"
              required
            />

            <input
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              placeholder="License Number"
              className="w-full border rounded-xl px-4 py-3"
              required
            />

            <input
              name="experience"
              type="number"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Experience"
              className="w-full border rounded-xl px-4 py-3"
            />

            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option>Available</option>
              <option>Assigned</option>
              <option>On Leave</option>
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

            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold">
              Update Driver
            </button>
          </form>
        </Modal>
      )}
    </motion.div>
  );
};

export default Drivers;