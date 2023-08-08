import React, { useState } from "react";
import axios from "axios";
import SongCard from "../SongCard/SongCard";
import "./Form.css";

export default function Form() {
  const [searchQuery, setSearchQuery] = useState({
    key: "",
    trackQuery: "",
  });
  const [returnedTracks, setReturnedTracks] = useState([]);

  async function getAuth() {
    const API = "http://localhost:8181/auth";
    const res = await axios.get(API);
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      key: res.data.access_token,
    }));
  }

  function handleSearch(event) {
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      trackQuery: event.target.value,
    }));
  }

  async function doSearch(event) {
    event.preventDefault();
    const API = "http://localhost:8181/search";
    const searchReturn = await axios.post(API, searchQuery);
    const returnedTracks = searchReturn.data.tracks.items;
    setReturnedTracks(returnedTracks);
    console.log(returnedTracks);
  }

  return (
    <div className="form-div">
      {returnedTracks.map((song, key) => (
        <div className="grid-item" key={song.id}>
          <SongCard
            songObject={song}
            title={song.name}
            artist={song.artists.name}
          />
        </div>
      ))}
      <button onClick={() => getAuth()}>Magic Access Key Spawner</button>
      <form onSubmitCapture={(event) => doSearch(event)}>
        <input
          placeholder="Track name"
          onChangeCapture={(event) => handleSearch(event)}
        ></input>
        <button type="submit">Submit</button>
        {/* <Select options={}/> */}
      </form>
    </div>
  );
}
