const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: String,
  genre: String,
  authorid: String,
});

module.exports = mongoose.model("Book", bookSchema);
