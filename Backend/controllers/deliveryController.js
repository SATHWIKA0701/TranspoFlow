const Delivery = require("../models/Delivery");

const cleanDeliveryData = (body) => {
  const data = { ...body };

  if (!data.assignedVehicle && data.vehicle) {
    data.assignedVehicle = data.vehicle;
  }

  if (!data.assignedDriver && data.driver) {
    data.assignedDriver = data.driver;
  }

  if (!data.vehicle && data.assignedVehicle) {
    data.vehicle = data.assignedVehicle;
  }

  if (!data.driver && data.assignedDriver) {
    data.driver = data.assignedDriver;
  }

  if (!data.assignedVehicle) {
    delete data.assignedVehicle;
  }

  if (!data.assignedDriver) {
    delete data.assignedDriver;
  }

  if (!data.vehicle) {
    delete data.vehicle;
  }

  if (!data.driver) {
    delete data.driver;
  }

  if (!data.expectedDeliveryDate) {
    delete data.expectedDeliveryDate;
  }

  if (!data.deliveryDate) {
    delete data.deliveryDate;
  }

  return data;
};

const getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find()
      .populate("assignedVehicle")
      .populate("assignedDriver")
      .populate("vehicle")
      .populate("driver")
      .sort({ createdAt: -1 });

    res.json(deliveries);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch deliveries",
      error: error.message
    });
  }
};

const getDeliveryById = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id)
      .populate("assignedVehicle")
      .populate("assignedDriver")
      .populate("vehicle")
      .populate("driver");

    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    res.json(delivery);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch delivery",
      error: error.message
    });
  }
};

const createDelivery = async (req, res) => {
  try {
    const data = cleanDeliveryData(req.body || {});

    const delivery = await Delivery.create(data);

    res.status(201).json(delivery);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create delivery",
      error: error.message
    });
  }
};

const updateDelivery = async (req, res) => {
  try {
    const data = cleanDeliveryData(req.body || {});

    const delivery = await Delivery.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true
    });

    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    res.json(delivery);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update delivery",
      error: error.message
    });
  }
};

const deleteDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndDelete(req.params.id);

    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    res.json({ message: "Delivery deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete delivery",
      error: error.message
    });
  }
};

module.exports = {
  getDeliveries,
  getDeliveryById,
  createDelivery,
  updateDelivery,
  deleteDelivery
};