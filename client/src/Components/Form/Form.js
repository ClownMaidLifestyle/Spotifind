import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import SongCard from "../SongCard/SongCard";
import Select from "react-select";
import "./Form.css";

import { genres } from "./genres";

export default function Form() {
  const [returnedTracks, setReturnedTracks] = useState([]);
  // const [trackObject, setTrackObject] = useState({});

  //turn developerMode FALSE for testing and TRUE before you commit
  localStorage.setItem("Developer_Mode", false);
  let developerMode = localStorage.getItem("Developer_Mode");
  // console.log(developerMode);

  let API;
  let liveAPI = "https://spotifindapi.onrender.com";
  let testAPI = "http://localhost:8181";

  if (developerMode == "false") {
    API = liveAPI;
  } else if (developerMode == "true") {
    API = testAPI;
  }
  // console.log(API);

  async function getAuth() {
    const res = await axios.get(API + "/auth");
    searchQuery.key = res.data.access_token;
  }

  useEffect(() => {
    getAuth();
  });

  const allGenres = [];
  for (let i = 0; i < genres.length + 1; i++) {
    const genreObj = {
      value: genres[i],
      label: genres[i],
    };
    allGenres.push(genreObj);
  }

  let trackList = [];
  console.log(typeof trackList);

  const [searchQuery, setSearchQuery] = useState({
    key: "",
    query: "",
    type: "track",
    startYear: "",
    endYear: "",
    genres: [],
  });

  // async function spotifyLogin() {
  //   const API = "http://localhost:8181/login";
  // }

  function handleSearch(event) {
    // console.log(event);
    setSearchQuery({
      ...searchQuery,
      query: event.target.value,
    });
  }

  const handleGenre = (selectedOption) => {
    if (selectedOption != false) {
      let i = selectedOption.length - 1;
      console.log(selectedOption);
      searchQuery.genres.push(selectedOption[i].value);
    } else {
      searchQuery.genres.pop();
    }
  };

  const handleStartYear = (selectedYear) =>{
    console.log(selectedYear)
    setSearchQuery({
      ...searchQuery,
      startYear: selectedYear.target.value,
    });
  }

  const handleEndYear = (selectedYear) =>{
    setSearchQuery({
      ...searchQuery,
      endYear: selectedYear.target.value,
    });
  }

  async function doSearch(event) {
    let genreCheck = 0;
    let searchValid = false;
    event.preventDefault();

    // console.log(searchQuery.genres);
    // see if search query has a genre and then modify the search.
    if (searchQuery.genres) {
      for (let i = 0; i < searchQuery.genres.length; i++) {
        for (let y = 0; y < genres.length; y++) {
          if (genres[y].toLowerCase() == searchQuery.genres[i].toLowerCase()) {
            genres[y].replace(" ", "_");
            genreCheck++;
          }
        }
      }
      if (genreCheck == searchQuery.genres.length) {
        searchValid = true;
      }
    } else {
      searchValid = true;
    }
    console.log(searchValid);

    if (searchValid) {
      console.log("searching... " + searchQuery);
      let searchReturn = await axios.post(API + "/search", searchQuery);

      // tracks *is* an object
      //const tracks = searchReturn.data.tracks.items;

      console.log(searchReturn);

      let resultsNumber = searchReturn.data.tracks.items.length;
      console.log("results number: " + resultsNumber);

      // searchReturn is an object
      searchReturn = searchReturn.data.tracks.items;
      // console.log("returns:" + searchReturn);
      for (let i = 0; i < resultsNumber; i++) {
        let track = [];
        track.push(searchReturn[i].name);
        track.push(searchReturn[i].album.name);
        track.push(searchReturn[i].album.images[0]);

        let artists = searchReturn[i].artists;
        let artistarray = [];

        for (let y = 0; y < artists.length; y++) {
          artistarray.push(artists[y].name);
        }
        track.push(artistarray);
        track.push(searchReturn[i].external_urls.spotify);

        track.push(searchReturn[i].preview_url);

        trackList.push(track);
      }
    } else {
      console.log("search failed");
    }
    if (!trackList) {
      trackList = "null";
    }

    setReturnedTracks(trackList);
    console.log("Tracklist: " + trackList);
    console.log(typeof trackList);
  }

  async function getUserAuth() {
    let res = await axios.get(API + "/userAuth");
    console.log(res);
    console.log(res.data.client_id);
    let data =
      "client_id=" +
      res.data.client_id +
      "&response_type=" +
      res.data.response_type +
      "&scope=" +
      res.data.scope +
      "&redirect_uri=" +
      res.data.redirect_uri +
      "&state=" +
      res.data.state;

    window.location = "https://accounts.spotify.com/authorize?" + data;
  }

  return (
    <div className="main">
      <form className="form" onSubmitCapture={(event) => doSearch(event)}>
        <input
          className="input"
          placeholder="Track name"
          onChangeCapture={(event) => handleSearch(event)}
        ></input>
        <Select
          className="select"
          placeholder="Genres (type to search)"
          options={allGenres}
          isMulti
          onChange={handleGenre}
          autoFocus={true}
        />
        <div>
                <input placeholder="Start Year" onChangeCapture={(event)=> handleStartYear(event)}></input>
                <input placeholder="End Year" onChangeCapture={(event)=> handleEndYear(event)}></input>
        </div>
        
        <button className="sub-btn" type="submit">
          Submit
        </button>

        
        {/* <Select options={}/> */}
      </form>
      <button className="linkbtn" onClick={() => getUserAuth()}>Link Spotify Account</button>
      <div className="grid-container">
        {returnedTracks.map((song, key) => (
          <div className="grid-item" key={key}>
            <SongCard
              songObject={song}
              title={song[0]}
              artist={song[3] ? song[3].join(", ") : ""}
              prevLink={song[5]}
              returnedTracks={returnedTracks}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
