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

    let developerMode = localStorage.getItem("Developer_Mode");
    // console.log(developerMode);
  
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
      const result = await axios.post(API+"/library", newSavedSong);
      setSavedSongs([...savedSongs, result.data]);
    } catch (error) {
      console.log(error);
    }
    console.log("returnedTrack: " + returnedTracks);
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
        // songToAdd={songToAdd}
        handleAddToLibrary={handleAddToLibrary}
        // returnedTracks={returnedTracks}
        title={title}
        artist={artist}
        prevLink={prevLink}
        // id={_id}
        songToAdd={songToAdd}
      />
      <h2>{title}</h2>
      <p className="artist">{artist}</p>
      { prevLink &&
      <button
        className="play-button"
        onClick={() => {
          preview.play();
        }}
      >
        Preview
      </button>}
      { prevLink &&
      <button
        className="pause-button"
        onClick={() => {
          preview.pause();
        }}
      >
        Pause
      </button>}
    </div>
  );
}
