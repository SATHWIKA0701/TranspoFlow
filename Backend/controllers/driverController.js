const Driver = require("../models/Driver");

const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find()
      .populate("assignedVehicle")
      .sort({ createdAt: -1 });

    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch drivers", error: error.message });
  }
};

const getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id).populate("assignedVehicle");

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch driver", error: error.message });
  }
};

const createDriver = async (req, res) => {
  try {
    const data = { ...req.body };

    if (!data.assignedVehicle) {
      delete data.assignedVehicle;
    }

    const driver = await Driver.create(data);

    res.status(201).json(driver);
  } catch (error) {
    res.status(500).json({ message: "Failed to create driver", error: error.message });
  }
};

const updateDriver = async (req, res) => {
  try {
    const data = { ...req.body };

    if (!data.assignedVehicle) {
      data.assignedVehicle = null;
    }

    const driver = await Driver.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true
    });

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: "Failed to update driver", error: error.message });
  }
};

const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.json({ message: "Driver deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete driver", error: error.message });
  }
};

module.exports = {
  getDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver
};