import React, { useState } from "react";
import "./SongCard.css";
import AddToLibrary from "../AddToLibrary/AddToLibrary";
import axios from "axios";

export default function SongCard({
  songObject,
  title,
  artist,
  prevLink,
  trackObject,
  returnedTracks,
}) {
  const [savedSongs, setSavedSongs] = useState([]);

  const handleAddToLibrary = async (newSavedSong) => {
    try {
      let API = `http://localhost:8181/library`;
      const result = await axios.post(API, newSavedSong);
      setSavedSongs([...savedSongs, result.data]);
    } catch (error) {
      console.log(error);
    }
    console.log(returnedTracks);
  };

  const preview = new Audio(prevLink);

  const songToAdd = {
    title: returnedTracks[0][0],
    artist: returnedTracks[0][3][0],
    link: returnedTracks[0][4],
    uri: returnedTracks[0][5],
    img_url: returnedTracks[0][2].url,
  };

  return (
    <div>
      <AddToLibrary
        songToAdd={songToAdd}
        handleAddToLibrary={handleAddToLibrary}
        returnedTracks={returnedTracks}
        title={title}
        artist={artist}
        prevLink={prevLink}
      />
      <h2>{title}</h2>
      <p className="artist">{artist}</p>
      <button
        className="play-button"
        onClick={() => {
          preview.play();
        }}
      >
        Preview
      </button>
      <button
        className="pause-button"
        onClick={() => {
          preview.pause();
        }}
      >
        Pause
      </button>
    </div>
  );
}
