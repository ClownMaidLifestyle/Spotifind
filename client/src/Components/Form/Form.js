import React from 'react'
import axios from "axios"
import {useState, useEffect} from "react"
import Select from "react-select"
import './Form.css';

import {genres} from "./genres"


export default function Form() {

    useEffect(() =>{
        getAuth();
    });


    const allGenres = []
        for(let i = 0; i<genres.length+1; i++){
            const genreObj = {
                value: genres[i],
                label: genres[i] }
            allGenres.push(genreObj)
    }

    let trackList = [];

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

    async function spotifyLogin(){
        const API = "http://localhost:8181/login"

    }

    function handleSearch(event){
        console.log(event);
    setSearchQuery({
        ...searchQuery,
        query: event.target.value
        })
    }

    const handleGenre = (selectedOption) => {
        selectedOption = selectedOption[0].value;
        setSearchQuery({
            ...searchQuery,
            genres: [selectedOption]
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
        console.log(trackList);
    }


    return (

    <div className='form'>
            
        <form className='sub-form' onSubmitCapture={(event) => doSearch(event)}>
            <input className='input' placeholder='Track name' onChangeCapture={(event) => handleSearch(event)}></input>
            <button className='sub.btn' type="submit">Submit</button>
            <Select options={allGenres} isMulti onChange={handleGenre} autoFocus={true}/>

        </form>

    </div>
    )
}