const CustomAPIError = require("../errors/custom-error");
const Hotel = require("../models/Hotel.js");
const Room = require("../models/Room.js");

const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  const savedRoom = await newRoom.save();

  await Hotel.findByIdAndUpdate(hotelId, {
    $push: { rooms: savedRoom._id },
  });

  res.status(200).json(savedRoom);
};

const updateRoom = async (req, res, next) => {
  const updatedRoom = await Room.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json(updatedRoom);
};
const updateRoomAvailability = async (req, res, next) => {
  await Room.updateOne(
    { "roomNumbers._id": req.params.id },
    {
      $push: {
        "roomNumbers.$.unavailableDates": req.body.dates,
      },
    }
  );
  res.status(200).json("Room status has been updated.");
};
const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;

  await Room.findByIdAndDelete(req.params.id);

  await Hotel.findByIdAndUpdate(hotelId, {
    $pull: { rooms: req.params.id },
  });
  res.status(200).json("Room has been deleted.");
};
const getRoom = async (req, res, next) => {
  const room = await Room.findById(req.params.id);
  res.status(200).json(room);
};
const getRooms = async (req, res, next) => {
  const rooms = await Room.find();
  res.status(200).json(rooms);
};

module.exports = {
  createRoom,
  updateRoom,
  updateRoomAvailability,
  deleteRoom,
  getRoom,
  getRooms,
};
