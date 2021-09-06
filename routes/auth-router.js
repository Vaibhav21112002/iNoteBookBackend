const express = require("express");
const {
  createUser,
  loginUser,
  userDetails,
} = require("../controller/user-ctrl");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();

router.post("/createuser", createUser);
router.post("/login", loginUser);
router.post("/getuser", fetchUser, userDetails);

module.exports = router;
