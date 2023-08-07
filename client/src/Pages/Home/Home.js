import React from "react";
import { Helmet } from "react-helmet-async";
import Main from "../../Components/Main/Main";

//remove later
import axios from 'axios';

export default function Home() {

  async function getAuth(){
    const API = "http://localhost:8181/auth"
    const res = await axios.get(API);
    console.log(res.data.access_token);
  }

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta
          name="description"
          content="This is the home page for Spotifind"
        />
        <link rel="canonical" href="/" />
      </Helmet>
      <main>
        <h2>Home Page</h2>
        <button onClick={()=>getAuth()}>The magic Access Key button</button>
        <Main />
      </main>
    </>
  );
}
