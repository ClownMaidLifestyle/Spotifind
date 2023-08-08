import React from 'react'
import axios from "axios"
import {useState} from "react"
import Select from "react-select"
import './Form.css';

import {genres} from "./genres"


export default function Form() {
    const allGenres = []
        for(let i = 0; i<genres.length+1; i++){
            const genreObj = {
                value: genres[i],
                label: genres[i] }
            allGenres.push(genreObj)
    }

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
            const searchReturn = await axios.post(API, searchQuery)
            console.log(searchReturn);
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
            <Select options={allGenres}/>
        </form>

    </div>
    )
}