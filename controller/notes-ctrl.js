const Notes = require("../models/Notes");

module.exports.getNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.addNote = async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const note = new Notes({
      title: title,
      description: description,
      tag: tag,
      user: req.id,
    });

    await note
      .save()
      .then(() => {
        res.status(200).send(note);
      })
      .catch((err) => res.stats(400).json({ err: err.message }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateNote = async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    let newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(404).send("Note not found");
    }

    if (note.user.toString() !== req.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(newNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports.deleteNote = async(req,res)=>{
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(404).send("Note not found");
    }

    if (note.user.toString() !== req.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.status(200).send("Note Deleted");s
  } catch (error) {
    res.status(500).json({err:error.message})
  }
}