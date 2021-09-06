const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "mysecret";

module.exports.createUser = async (req, res) => {
  try {
    let userCheck = await User.findOne({ email: req.body.email });
    if (userCheck) {
      res
        .status(400)
        .json({ errors: "The user with this email already exists" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });
    const authtoken = jwt.sign(
      {
        id: user._id,
      },
      JWT_SECRET
    );
    await user
      .save()
      .then(() => {
        res.json({
          authtoken,
        });
      })
      .catch((err) => res.json({ message: "User Creation Unsuccessful" }));
  } catch (error) {
    throw error;
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: "User Does not Exists" });
    }
    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      res.status(400).json({
        error: "Username of password is incorrect! Try to Login Again",
      });
    }

    const authtoken = jwt.sign(
      {
        id: user._id,
      },
      JWT_SECRET
    );
    res.json({ authtoken });
  } catch (error) {
    res.status(404).json({ error: "Error in Login" });
  }
};

module.exports.userDetails = async (req, res) => {
  try {
    const userId = req.id;
    const users = await User.findById(userId).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
