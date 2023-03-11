const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Note = require("../../models/note");
const User = require("../../models/user");

//add note
router.post(
  "/",
  auth,
  check("note", "Text is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("--password");
      const newNote = new Note({
        username: user.username,
        user: req.user.id,
        note: req.body.note,
      });
      const note = await newNote.save();
      res.json(note);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
);
//get note
router.get("/", auth, async (req, res) => {
  try {
    const note = await Note.find({user:req.user.id});
    if (!note) {
      return res.status(404).json({ status: "Note Not Found" });
    }
    res.json(note);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Note Not Found" });
    }
    res.status(500).send("Server Error");
  }
});
//delete note
router.delete("/note/:id", auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ status: "Note Not Found" });
    }
    if (note.user.toString() != req.user.id) {
      return res.status(401).json({ msg: "User Not Authnorized" });
    }
    await note.remove();
    res.json({ msg: "Note Removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Note Not Found" });
    }
    res.status(500).send("Server Error");
  }
});
//edit note
router.put("/note/:id", auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ status: "Note Not Found" });
    }
    if (note.user.toString() != req.user.id) {
      return res.status(401).json({ msg: "User Not Authnorized" });
    }
    await note.remove();
    res.json({ msg: "note Removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Note Not Found" });
    }
    res.status(500).send("Server Error");
  }
});
module.exports = router;
