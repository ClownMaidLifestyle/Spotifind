import React, { useState } from "react";
import "./SavedSongCard.css";
import axios from "axios";

export default function SavedSongCard({
  songObject,
  title,
  artist,
  getSavedSongs,
  handleRemoveFromLibrary,
}) {
  //   console.log(songObject);

  return (
    <div className="song-card-div">
      <h5
        className="delete-button"
        onClick={() => handleRemoveFromLibrary(songObject.id)}
      >
        -
      </h5>
      <h2>{title}</h2>
      <p>{artist}</p>
      <button className="play-button">Preview</button>
    </div>
  );
}
