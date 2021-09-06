const express = require("express");
const { getNotes, addNote, updateNote,deleteNote } = require("../controller/notes-ctrl");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();

router.get("/all", fetchUser, getNotes);
router.post("/add", fetchUser, addNote);
router.put("/update/:id", fetchUser, updateNote);
router.delete("/delete/:id", fetchUser, deleteNote);

module.exports = router;
