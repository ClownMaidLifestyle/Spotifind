import React, { useState, useEffect } from "react";
import SavedSongCard from "../../Components/SavedSongCard/SavedSongCard";
import axios from "axios";
import { Helmet } from "react-helmet-async";

export default function Library() {
  const [savedSongs, setSavedSongs] = useState([]);

  useEffect(() => {
    getSavedSongs();
    console.log(savedSongs);
  }, []);

  //READ
  async function getSavedSongs() {
    try {
      let API = `http://localhost:8181/library`;
      const result = await axios.get(API);
      setSavedSongs([]);
      setSavedSongs(result.data);
      console.log(savedSongs);
    } catch (error) {
      console.log(error);
    }
  }

  //DELETE
  const handleRemoveFromLibrary = async (id) => {
    await axios.delete(`http://localhost:8181/library/${id}`);
    getSavedSongs();
  };

  return (
    <div>
      <>
        <Helmet>
          <title>Library</title>
          <meta
            name="description"
            content="This is the library for Spotifind"
          />
          <link rel="canonical" href="/library" />
        </Helmet>
        <main>
          <SavedSongCard handleRemoveFromLibrary={handleRemoveFromLibrary} />
        </main>
      </>
    </div>
  );
}
