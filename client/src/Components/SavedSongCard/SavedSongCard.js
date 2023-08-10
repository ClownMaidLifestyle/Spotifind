import React, { useState } from "react";
import "./SavedSongCard.css";

export default function SavedSongCard({
  handleRemoveFromLibrary,
  title,
  artist,
  link,
  uri,
  id,
}) {
  const preview = new Audio(link);
  return (
    <div className="song-card-div">
      <p
        id="add-button"
        className="delete-button"
        onClick={() => handleRemoveFromLibrary(id)}
      >
        -
      </p>
      <h2>{title}</h2>
      <p>{artist}</p>
      {link && (
        <button
          className="play-button"
          onClick={() => {
            preview.play();
          }}
        >
          Preview
        </button>
      )}
      {link && (
        <button
          className="pause-button"
          onClick={() => {
            preview.pause();
          }}
        >
          Pause
        </button>
      )}
    </div>
  );
}
