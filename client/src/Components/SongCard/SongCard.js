import React, { useState } from "react";
import "./SongCard.css";
import AddToLibrary from "../AddToLibrary/AddToLibrary";
import axios from "axios";

export default function SongCard({
  songObject,
  title,
  artist,
  prevLink,
  returnedTracks,
}) {
  const [savedSongs, setSavedSongs] = useState([]);

  let developerMode = localStorage.getItem("Developer_Mode");

  let API;
  let liveAPI = "https://spotifindapi.onrender.com";
  let testAPI = "http://localhost:8181";

  if (developerMode == "false") {
    API = liveAPI;
  } else if (developerMode == "true") {
    API = testAPI;
  }

  const handleAddToLibrary = async (newSavedSong) => {
    try {
      const result = await axios.post(API + "/library", newSavedSong);
      setSavedSongs([...savedSongs, result.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const preview = new Audio(prevLink);

  const songToAdd = {
    title,
    artist: artist.split(", ")[0],
    link: prevLink,
    uri: songObject[4],
    img_url: songObject[2].url,
  };

  return (
    <div>
      <AddToLibrary
        handleAddToLibrary={handleAddToLibrary}
        title={title}
        artist={artist}
        prevLink={prevLink}
        songToAdd={songToAdd}
      />
      <h2>{title}</h2>
      <p className="artist">{artist}</p>
      {prevLink && (
        <button
          className="play-button"
          onClick={() => {
            preview.play();
          }}
        >
          Preview
        </button>
      )}
      {prevLink && (
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
