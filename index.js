const express = require("express");
const connectDB = require("./db/db");
connectDB();

const app = express();
app.use(express.json());
const PORT = 8080;

app.use("/api/auth", require("./routes/auth-router"));
app.use("/api/notes", require("./routes/notes-router"));
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
