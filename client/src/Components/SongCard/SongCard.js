import React, { useState } from "react";
import "./SongCard.css";

export default function SongCard({ songObject, title, artist }) {
  return (
    <div className="song-card-div">
      <h2>{title}</h2>
      <p>{artist}</p>
      <button className="play-button">Preview</button>
    </div>
  );
}
