const mongoose = require("mongoose");
const { Schema } = mongoose;

const songSchema = new Schema({
  title: String,
  artist: String,
  year: Number,
  link: String,
  uri: String,
  img_url: String,
  user_id: String,
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
