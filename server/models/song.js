const mongoose = require("mongoose");
const { Schema } = mongoose;

const songSchema = new Schema({
  title: String,
  artist: String,
  year: Number,
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
