const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: [true, "Vehicle number is required"],
      unique: true,
      trim: true
    },
    type: {
      type: String,
      required: [true, "Vehicle type is required"],
      trim: true
    },
    capacity: {
      type: String,
      required: [true, "Capacity is required"],
      trim: true
    },
    status: {
      type: String,
      enum: ["Available", "Assigned", "Maintenance"],
      default: "Available"
    },
    fuelType: {
      type: String,
      enum: ["Diesel", "Petrol", "CNG", "Electric", "Hybrid"],
      default: "Diesel"
    },
    lastServiceDate: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);