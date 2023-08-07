import React, { useEffect, useState } from "react";
import "./Main.css";
import axios from "axios";
import SongCard from "../SongCard/SongCard";
import SearchResults from "../SearchResults/SearchResults";
export default function Main() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getSongs();
  }, []);

  //CREATE
  const handleAddSong = async (newSong) => {
    try {
      let API = `localhost:8181/library`;
      const result = await axios.post(API, newSong);
      setSongs([...songs, result.data]);
    } catch (error) {
      console.log(error);
    }
  };

  //READ
  async function getSongs() {
    try {
      let API = `localhost:8181/library`;
      const result = await axios.get(API);
      setSongs([]);
      setSongs(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  //UPDATE
  const handleUpdateSong = async (song) => {
    await axios.put(`localhost:8181/library`, song);
    getSongs();
  };

  //DELETE

  const deleteSong = async (id) => {
    await axios.delete(`localhost:8181/library`);
    getSongs();
  };

  return (
    <div className="songs">
      <h2>Songs</h2>
      <SearchResults
        songs={songs}
        deleteSong={deleteSong}
        handleUpdateSong={handleUpdateSong}
      />

      <button className="addButton">Add Song</button>
    </div>
  );
}
