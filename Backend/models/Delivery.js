const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema(
  {
    shipmentId: {
      type: String,
      required: [true, "Shipment ID is required"],
      unique: true,
      trim: true
    },
    materialName: {
      type: String,
      required: [true, "Material name is required"],
      trim: true
    },
    pickupLocation: {
      type: String,
      required: [true, "Pickup location is required"],
      trim: true
    },
    destination: {
      type: String,
      required: [true, "Destination is required"],
      trim: true
    },
    assignedVehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      default: null
    },
    assignedDriver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      default: null
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      default: null
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      default: null
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium"
    },
    status: {
      type: String,
      enum: ["Pending", "Dispatched", "In Transit", "Delivered", "Delayed"],
      default: "Pending"
    },
    scheduledDate: {
      type: Date,
      required: [true, "Scheduled date is required"]
    },
    expectedDeliveryDate: {
      type: Date
    },
    deliveryDate: {
      type: Date
    },
    notes: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Delivery", deliverySchema);