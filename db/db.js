const mongoose = require("mongoose");

const URL =
  "mongodb+srv://inotebook:inotebook@cluster0.ndcm6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = () => {
  mongoose.connect(URL, () => {
    console.log("Database Connected Sccessfully");
  });
};

module.exports = connectDB;
