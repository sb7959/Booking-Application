const express = require("express");
const router = express.Router();
const {
  createRoom,
  updateRoom,
  updateRoomAvailability,
  deleteRoom,
  getRoom,
  getRooms,
} = require("../controllers/room");
const { verifyAdmin } = require("../middlewares/verifyToken");

router.route("/:hotelid").post(verifyAdmin, createRoom);

router.route("/availability/:id").put(updateRoomAvailability);

router.route("/:id/:hotelid").delete(verifyAdmin, deleteRoom);

router.route("/:id").get(getRoom).put(verifyAdmin, updateRoom);

router.route("/").get(getRooms);

module.exports = router;
