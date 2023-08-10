import React from "react";
import "./AddToLibrary.css";

export default function AddToLibrary({ handleAddToLibrary, songToAdd }) {
  let localId = localStorage.getItem("user_ID");

  return (
    <div className="song-card-div">
      {
        <p id="add-button" onClick={() => handleAddToLibrary(songToAdd)}>
          +
        </p>
      }
    </div>
  );
}
