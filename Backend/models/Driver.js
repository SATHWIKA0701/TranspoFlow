const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Driver name is required"],
      trim: true
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true
    },
    licenseNumber: {
      type: String,
      required: [true, "License number is required"],
      unique: true,
      trim: true
    },
    experience: {
      type: Number,
      default: 0,
      min: 0
    },
    availability: {
      type: String,
      enum: ["Available", "Assigned", "On Leave"],
      default: "Available"
    },
    assignedVehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", driverSchema);