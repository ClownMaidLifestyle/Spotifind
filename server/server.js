const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bp = require("body-parser");
const axios = require("axios");
const e = require("express");

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

app.post(`/search`, async (request, response) =>{

  console.log("building query...");
  let currentQuery = request.body.query;
  console.log(request.body);
  if (request.body.genres){
    for (let i = 0; i < request.body.genres.length; i++)
    currentQuery = currentQuery +"+genre:" + request.body.genres;
  }

  if (request.body.startYear && request.body.endYear){
    currentQuery = currentQuery+' year:'+request.body.startYear+'-'+request.body.endYear;
  }
  else if (request.body.startYear || request.body.endYear){
    currentQuery = currentQuery+' year:'+(request.body.startYear||request.body.endYear)
  };

  const API = `https://api.spotify.com/v1/search?q=`;
  const searchParameters = {
    headers: {
      Authorization: `Bearer ${request.body.key}`
    }
  }

  console.log (currentQuery);
  console.log("fetching...");
    fetch(API+currentQuery+`&type=track`, searchParameters)
  .then(result => result.json())
  .then(data => response.status(200).json(data))
});

app.get('/login', function(request, response){
  const API = `https://accounts.spotify.com/authorize`
  const redirectURI =  "https://localhost:8181/"
  const scopes = [
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-private",
    "playlist-modify-public"
  ]
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
