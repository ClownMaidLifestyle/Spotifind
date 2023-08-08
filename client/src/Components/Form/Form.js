import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import SongCard from "../SongCard/SongCard";
import Select from "react-select";
import "./Form.css";

import { genres } from "./genres";

export default function Form() {
  const [returnedTracks, setReturnedTracks] = useState([]);

  async function getAuth() {
    const API = "http://localhost:8181/auth";
    const res = await axios.get(API);
    searchQuery.key = res.data.access_token;
  }

  useEffect(() => {
    getAuth();
  });

  const allGenres = [];
  for (let i = 0; i < genres.length + 1; i++) {
    const genreObj = {
      value: genres[i],
      label: genres[i],
    };
    allGenres.push(genreObj);
  }

  let trackList = [];

  const [searchQuery, setSearchQuery] = useState({
    key: "",
    query: "",
    type: "track",
    startYear: "",
    endYear: "",
    genres: [],
  });

  function handleSearch(event) {
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      trackQuery: event.target.value,
    }));
  }


  // async function spotifyLogin() {
  //   const API = "http://localhost:8181/login";
  // }

  async function getAuth(){
    const API = "http://localhost:8181/auth"
    const res = await axios.get(API);
    searchQuery.key = res.data.access_token;
}

  function handleSearch(event) {
    console.log(event);
    setSearchQuery({
        ...searchQuery,
        query: event.target.value
        })
    }

    const handleGenre = (selectedOption) => {
            let i = selectedOption.length - 1;
            console.log(selectedOption);
            searchQuery.genres.push(selectedOption[i].value)
        console.log(searchQuery.genres);
    }

    async function doSearch(event){
        let genreCheck = 0;
        let searchValid = false;
        event.preventDefault()

        console.log(searchQuery.genres);
        if (searchQuery.genres){
            for (let i = 0; i < searchQuery.genres.length; i++){
                for (let y = 0; y < genres.length; y++){
                    if (genres[y].toLowerCase()==searchQuery.genres[i].toLowerCase()){
                        console.log(genres[y]);
                        genreCheck++;
                    }
                }
            }
            if (genreCheck == searchQuery.genres.length){
                searchValid=true;
            }
        }
        else{
            searchValid=true;
        }
        console.log(searchValid);
        if (searchValid){
            console.log("searching..." +searchQuery.genres);
            const API = 'http://localhost:8181/search'
            let searchReturn = await axios.post(API, searchQuery)
            searchReturn = searchReturn.data.tracks.items;
            console.log("returns:"+searchReturn);
            for (let i = 0; i < 20; i++){
                let track = [];

                track.push(searchReturn[i].name);
                track.push(searchReturn[i].album.name);
                track.push(searchReturn[i].album.images[0]);

                let artists = searchReturn[i].artists;
                let artistarray = [];
            
                for(let y = 0; y < artists.length; y++){
                    artistarray.push(artists[y].name);
                }
                track.push(artistarray);
                track.push(searchReturn[i].external_urls.spotify);

                track.push(searchReturn[i].preview_url)

                trackList.push(track);
            }
        }
        else{
            console.log("Search failed");

        }
    }

  return (
    <div className="grid-container">
      {returnedTracks.map((song, key) => (
        <div className="grid-item" key={song.id}>
          <SongCard
            songObject={song}
            title={song.name}
            artist={song.artists.name}
          />
        </div>
      ))}
      <form onSubmitCapture={(event) => doSearch(event)}>
        <input
          placeholder="Track name"
          onChangeCapture={(event) => handleSearch(event)}
        ></input>
        <Select
          options={allGenres}
          isMulti
          onChange={handleGenre}
          autoFocus={true}
        />
        <button type="submit">Submit</button>
        {/* <Select options={}/> */}
      </form>
    </div>
  );
}
