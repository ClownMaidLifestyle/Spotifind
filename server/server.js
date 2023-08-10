const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bp = require("body-parser");
const axios = require("axios");
const e = require("express");
const crypto = require("crypto")
const queryString = require("querystring");

require("dotenv").config();

const PORT = process.env.PORT || 8181;
const redirectURI = process.env.Redirect_URI;

const app = express();
app.use(cors());
app.use(bp.json());

const Song = require("./models/song");
mongoose.connect(process.env.DATABASE_URL);

//Health Check
app.get("/", (request, response) => {
  response.status(200).json("Spotifind is aliiiiive");
});

//Spotify API requests

const clientId = process.env.Client_Id;
const clientSecret = process.env.Client_Secret;

app.get(`/auth`, async (request, response) => {
  const AuthParamaters = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      "grant_type=client_credentials&client_id=" +
      clientId +
      "&client_secret=" +
      clientSecret,
  };

  fetch(`https://accounts.spotify.com/api/token`, AuthParamaters)
    .then((result) => result.json())
    .then((data) => response.status(200).json(data))
    .catch((error) => console.log(error));
});

app.post(`/search`, async (request, response) => {
  console.log("building query...");
  let currentQuery = request.body.query;
  console.log(request.body);
  if (request.body.genres) {
    for (let i = 0; i < request.body.genres.length; i++)
      currentQuery = currentQuery + "+genre:" + request.body.genres[i];
  }

  if (request.body.startYear && request.body.endYear) {
    currentQuery =
      currentQuery +
      " year:" +
      request.body.startYear +
      "-" +
      request.body.endYear;
  } else if (request.body.startYear || request.body.endYear) {
    currentQuery =
      currentQuery +
      " year:" +
      (request.body.startYear || request.body.endYear);
  }

  const API = `https://api.spotify.com/v1/search?q=`;
  const searchParameters = {
    headers: {
      Authorization: `Bearer ${request.body.key}`,
    },
  };

  console.log(currentQuery);
  console.log("fetching...");
  fetch(API + currentQuery + `&type=track`, searchParameters)
    .then((result) => result.json())
    .then((data) => response.status(200).json(data));
});

app.get("/userAuth", function (request, response) {
  function generateRandomString(length) {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  const searchParams = {
    response_type: "code",
    client_id: clientId,
    scope:
      "user-read-private user-read-email playlist-read-private playlist-modify-private playlist-modify-public",
    redirect_uri: redirectURI,
    state: generateRandomString(16),
  };
  console.log(searchParams);
  response.status(200).json(searchParams);
});

  app.post(`/userAuthStage2`, async function (req, res){

    let client_id = clientId;
    let client_secret = clientSecret;
    let code =  req.body.code
    const authParams = {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: queryString.stringify({
        code: code,
        redirect_uri: redirectURI,
        grant_type:"authorization_code"
      })
    }

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', authParams);
      const data = await response.json();
    
      if (response.ok) {
        res.json(data);
      } else {
        console.error('Error exchanging code for access token:', data);
      }
    } catch (error) {
      console.error('Error exchanging code for access token:', error);
      res.status(500).json({ error: 'server_error' });
    }
    
  });

app.post("/profile", async function (req, res) {
  access_Key = "Bearer " + req.body[0]
  console.log("key " + access_Key)
  authParams ={
    headers:{
      'Authorization' : access_Key
    }
  }

  const API = 'https://api.spotify.com/v1/me';


  try {
    const response = await axios.get(API, authParams);
    const data = await response.data;
  
      console.log(data);
      res.status(200).json(data)

    }
  catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'server_error' });
  }
  

});

//MongoDB requests

// CREATE
app.post("/library", async (request, response) => {
  try {
    const newSavedSong = await Song.create(request.body);
    response.status(200).json(newSavedSong);
    console.log(newSavedSong);
  } catch (error) {
    response.status(500).json(error);
  }
});

//READ
app.get("/library", async (request, response) => {
  try {
    const allSavedSongs = await Song.find(request.query);
    response.status(200).json(allSavedSongs);
  } catch (error) {
    response.status(404).json(error);
  }
});

//DELETE
app.delete("/library/:_id", async (request, response) => {
  console.log("test " + request);
  try {
    const id = request.params._id;
    console.log(id);
    const deleteSong = await Book.findByIdAndDelete(id);
    response.status(200).send(deleteSong);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
});

// //UPDATE
// app.put()

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
