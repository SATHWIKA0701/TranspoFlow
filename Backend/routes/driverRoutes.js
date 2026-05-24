const express = require("express");
const {
  getDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver
} = require("../controllers/driverController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getDrivers);
router.post("/", protect, createDriver);
router.get("/:id", protect, getDriverById);
router.put("/:id", protect, updateDriver);
router.delete("/:id", protect, deleteDriver);

module.exports = router;