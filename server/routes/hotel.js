const express = require("express");
const router = express.Router();
const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  countByCity,
  countByType,
  getHotelRooms,
} = require("../controllers/hotel");

const { verifyAdmin } = require("../middlewares/verifyToken");

router.route("/").post(verifyAdmin, createHotel).get(getHotels);
router
  .route("/:id")
  .put(verifyAdmin, updateHotel)
  .delete(verifyAdmin, deleteHotel);
router.route("/find/:id").get(getHotel);
router.route("/countByCity").get(countByCity);
router.route("/countByType").get(countByType);
router.route("/room/:id").get(getHotelRooms);

module.exports = router;
