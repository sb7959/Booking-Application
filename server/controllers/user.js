const User = require("../models/User");

const updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json(updatedUser);
};

const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json("User has been deleted.");
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json(user);
};
const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

module.exports = { updateUser, deleteUser, getUser, getUsers };
