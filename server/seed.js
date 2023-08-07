const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL);

const Song = require("./models/song");

async function seed() {
  await Song.create({
    title: "",
    artist: "",
    status: "",
  });
  await Song.create({
    title: "",
    artist: "",
    status: "",
  });
  await Song.create({
    title: "",
    artist: "",
    status: "",
  });
  console.log("go song go");
  mongoose.disconnect();
}

seed();
