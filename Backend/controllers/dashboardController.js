const Vehicle = require("../models/Vehicle");
const Driver = require("../models/Driver");
const Delivery = require("../models/Delivery");

const getDashboardStats = async (req, res) => {
  try {
    const totalVehicles = await Vehicle.countDocuments();
    const availableVehicles = await Vehicle.countDocuments({
      status: "Available"
    });
    const assignedVehicles = await Vehicle.countDocuments({
      status: "Assigned"
    });
    const maintenanceVehicles = await Vehicle.countDocuments({
      status: "Maintenance"
    });

    const totalDrivers = await Driver.countDocuments();
    const availableDrivers = await Driver.countDocuments({
      availability: "Available"
    });
    const assignedDrivers = await Driver.countDocuments({
      availability: "Assigned"
    });
    const onLeaveDrivers = await Driver.countDocuments({
      availability: "On Leave"
    });

    const totalDeliveries = await Delivery.countDocuments();
    const pendingDeliveries = await Delivery.countDocuments({
      status: "Pending"
    });
    const dispatchedDeliveries = await Delivery.countDocuments({
      status: "Dispatched"
    });
    const inTransitDeliveries = await Delivery.countDocuments({
      status: "In Transit"
    });
    const deliveredDeliveries = await Delivery.countDocuments({
      status: "Delivered"
    });
    const delayedDeliveries = await Delivery.countDocuments({
      status: "Delayed"
    });

    const activeDeliveries = await Delivery.countDocuments({
      status: { $in: ["Dispatched", "In Transit"] }
    });

    const recentDeliveries = await Delivery.find()
      .populate("assignedVehicle")
      .populate("assignedDriver")
      .populate("vehicle")
      .populate("driver")
      .sort({ createdAt: -1 })
      .limit(5);

    const priorityShipments = await Delivery.find({
      priority: { $in: ["High", "Critical"] }
    })
      .sort({ createdAt: -1 })
      .limit(5);

    const monthlyDeliveries = await Delivery.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          deliveries: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const monthNames = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    const monthlyData = monthlyDeliveries.map((item) => ({
      month: monthNames[item._id],
      deliveries: item.deliveries
    }));

    const vehicleUtilizationData = [
      {
        name: "Available",
        value: availableVehicles
      },
      {
        name: "Assigned",
        value: assignedVehicles
      },
      {
        name: "Maintenance",
        value: maintenanceVehicles
      }
    ];

    res.status(200).json({
      totalVehicles,
      availableVehicles,
      assignedVehicles,
      maintenanceVehicles,

      totalDrivers,
      availableDrivers,
      assignedDrivers,
      onLeaveDrivers,

      totalDeliveries,
      activeDeliveries,
      pendingDeliveries,
      dispatchedDeliveries,
      inTransitDeliveries,
      deliveredDeliveries,
      delayedDeliveries,

      recentDeliveries,
      priorityShipments,
      monthlyData,
      vehicleUtilizationData
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load dashboard",
      error: error.message
    });
  }
};

module.exports = { getDashboardStats };