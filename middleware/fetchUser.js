const jwt = require("jsonwebtoken");
const JWT_SECRET = "mysecret";

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Unauthorised Token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.id = data.id;
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = fetchUser;
