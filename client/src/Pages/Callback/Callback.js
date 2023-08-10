import React from 'react'
import { useEffect} from "react"
import { Helmet } from "react-helmet-async"
import axios from "axios"

export default function Callback() {

    developerMode = localStorage.getItem("Developer_Mode")

    let liveAPI = "https://spotifindapi.onrender.com";
    let testAPI = "http://localhost:8181" 
  
    let API;
  
    if (developerMode == false){
      API = liveAPI;
    }
    else{
      API = testAPI;
    }
  


    useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    localStorage.setItem('userAuthCode', code);
    let state = urlParams.get('state');
    localStorage.setItem('state', state);

    })

    async function stage2(){
        let stage2payload = {
            code: localStorage.getItem('userAuthCode')
        };
        const res = await axios.post(API+"/userAuthStage2", stage2payload);
        console.log(res);
        let localStore_User_Access_key = [];
        localStore_User_Access_key.push(res.data.access_token, res.data.expires_in, res.data.refresh_token, res.data.scope, res.data.token_type);
        console.log(localStore_User_Access_key);
        localStorage.setItem("user_access_key", localStore_User_Access_key)
        stage3(localStore_User_Access_key)
    }

    async function stage3(localStore_User_Access_key){
        let res = await axios.post(API+"/profile", localStore_User_Access_key);
        res = res.data
        console.log(res)
        localStorage.setItem("display_name", res.display_name)
        localStorage.setItem("user_ID", res.id)
        window.location="http://localhost:3000/"
    }
  return (
<>
    <Helmet>
      <title>Callback</title>
      <meta
        name="description"
        content="This is the redirect page for spotify calls"
      />
      <link rel="canonical" href="/" />
    </Helmet>
    <main>
        <button onClick={() => stage2()}>Connect Spotify Profile</button>
    </main>
  </>
  )
}
