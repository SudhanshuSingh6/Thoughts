const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  username: {
    type: "string",
    required: true,
  },
  note: {
    type: "string",
    required: true,
  },
  date: {
    type: "date",
    default: Date.now,
  },
});

module.exports = Note = mongoose.model("note", NoteSchema);
