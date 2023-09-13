const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const newUser = new User({
    ...req.body,
    password: hash,
  });

  await newUser.save();
  res.status(200).send("User has been created.");
};

const login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) throw new CustomAPIError("User not found!", 404);

  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordCorrect)
    throw new CustomAPIError("Wrong password or username!", 400);

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT
  );

  const { password, isAdmin, ...otherDetails } = user._doc;
  res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
    .json({ details: { ...otherDetails }, isAdmin });
};

module.exports = { register, login };
