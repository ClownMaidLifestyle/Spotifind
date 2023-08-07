const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bp = require("body-parser");

require("dotenv").config();

const PORT = process.env.PORT || 8181;

const app = express();
app.use(cors());
app.use(bp.json());

mongoose.connect(process.env.DATABASE_URL);

app.get("/", (request, response) => {
  response.status(200).json("Spotifind is aliiiiive");
});

//CREATE
app.post();

//READ
app.get();

//DELETE
app.delete();

//UPDATE
app.put();

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
