import React from "react";
import "./AddToLibrary.css";

export default function AddToLibrary({ handleAddToLibrary, songToAdd }) {
  // console.log("song: " + songToAdd);
  // console.log("TEST: " + songToAdd[0]);
  return (
    <div className="song-card-div">
      <p id="add-button" onClick={() => handleAddToLibrary(songToAdd)}>
        +
      </p>
    </div>
  );
}
