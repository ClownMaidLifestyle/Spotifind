import React from 'react'
import axios from "axios"
import {useState} from "react"
import './Form.css'

export default function Form() {

    const [searchQuery, setSearchQuery] = useState({
        key: '',
        query: '',
        type: 'track',
        startYear: '',
        endYear: ''
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
        event.preventDefault()
        const API = 'http://localhost:8181/search'
        const searchReturn = await axios.post(API, searchQuery)
        console.log(searchReturn);
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