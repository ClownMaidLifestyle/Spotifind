import React, { useState } from "react";
import "./SongCard.css";
import axios from "axios";

export default function SongCard({ songObject, title, artist }) {
  const [savedSongs, setSavedSongs] = useState([]);

  const handleAddToLibrary = async (newSavedSong) => {
    try {
      let API = `http://localhost:8181/library`;
      const result = await axios.post(API, newSavedSong);
      setSavedSongs([...savedSongs, result.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="song-card-div">
      <h5 className="add-button" onClick={() => handleAddToLibrary}>
        +
      </h5>
      <h2>{title}</h2>
      <p>{artist}</p>
      <button className="play-button">Preview</button>
    </div>
  );
}
