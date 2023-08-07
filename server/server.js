const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bp = require("body-parser");
const axios = require("axios");

require("dotenv").config();

const PORT = process.env.PORT || 8181;

const app = express();
app.use(cors());
app.use(bp.json());

mongoose.connect(process.env.DATABASE_URL);

//Health Check
app.get("/", (request, response) => {
  response.status(200).json("Spotifind is aliiiiive");
});

//Spotify API requests

const clientId = process.env.Client_Id
const clientSecret = process.env.Client_Secret

app.get(`/auth`, async (request, response) =>{
  const AuthParamaters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials&client_id='+clientId+'&client_secret='+clientSecret
  }

    fetch(`https://accounts.spotify.com/api/token`, AuthParamaters)
    .then(result => result.json())
    .then(data => response.status(200).json(data))
    .catch(error => console.log(error));
});

//MongoDB requests

//CREATE
//app.post();

//READ
//app.get();

//DELETE
//app.delete();

//UPDATE
//app.put();

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
