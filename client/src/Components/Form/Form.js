import React from 'react'
import axios from "axios"
import {useState} from "react"
import './Form.css';

import {genres} from "./genres"


export default function Form() {

    const [searchQuery, setSearchQuery] = useState({
        key: '',
        query: '',
        type: 'track',
        startYear: '',
        endYear: '',
        genres: []
    })

    async function getAuth(){
        const API = "http://localhost:8181/auth"
        const res = await axios.get(API);
        searchQuery.key = res.data.access_token;
    }

    function handleSearch(event){
    setSearchQuery({
        ...searchQuery,
        query: event.target.value
        })
    }

    async function doSearch(event){
        let genreCheck = 0;
        let searchValid = false;
        event.preventDefault()
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
                searchQuery.genres.map((genre) =>{
                    genre = genre.charAt(0).toUpperCase() + genre.slice(1);
                });
            }
        }
        else{
            searchValid=true;
        }
        console.log(searchValid);
        if (searchValid){
            console.log("searching...");
            const API = 'http://localhost:8181/search'
            let searchReturn = await axios.post(API, searchQuery)
            searchReturn = searchReturn.data.tracks.items;
            console.log(searchReturn);
            let trackList = [];
            for (let i = 0; i < 20; i++){
                let track = [];

                track.push(searchReturn[i].name);
                track.push(searchReturn[i].album.name);
                track.push(searchReturn[i].album.images[0]);

                let artists = searchReturn[i].artists;
                let artistarray = [];
                console.log(artists);
            
                for(let y = 0; y < artists.length; y++){
                    artistarray.push(artists[y].name);
                }
                track.push(artistarray);
                track.push(searchReturn[i].external_urls.spotify);

                console.log(track);
                //trackList.push(track);
            }
        }
        else{
            console.log("Search failed");
        }
    }

    return (
    <div>
        <button onClick={()=>getAuth()}>Magic Access Key Spawner</button>
        <form onSubmitCapture={(event) => doSearch(event)}>
            <input placeholder='Track name' onChangeCapture={(event) => handleSearch(event)}></input>
            <button type="submit">Submit</button>
        </form>
    </div>
    )
}