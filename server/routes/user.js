const express = require("express");
const router = express.Router();
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../controllers/user");

const { verifyAdmin, verifyUser } = require("../middlewares/verifyToken");

router
  .route("/:id")
  .put(verifyUser, updateUser)
  .delete(verifyUser, deleteUser)
  .get(verifyUser, getUser);

//router.delete("/:id", verifyUser, deleteUser);

//router.get("/:id", verifyUser, getUser);

//GET ALL
router.route("/").get(verifyAdmin, getUsers);

module.exports = router;
