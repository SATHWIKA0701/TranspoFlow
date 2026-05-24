const express = require("express");
const {
  getDeliveries,
  getDeliveryById,
  createDelivery,
  updateDelivery,
  deleteDelivery
} = require("../controllers/deliveryController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getDeliveries);
router.post("/", protect, createDelivery);
router.get("/:id", protect, getDeliveryById);
router.put("/:id", protect, updateDelivery);
router.delete("/:id", protect, deleteDelivery);

module.exports = router;