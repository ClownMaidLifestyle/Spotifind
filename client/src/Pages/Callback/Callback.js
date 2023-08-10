import React from 'react'
import { useEffect} from "react"
import { Helmet } from "react-helmet-async"
import axios from "axios"

export default function Callback() {

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
        const res = await axios.post("http://localhost:8181/userAuthStage2", stage2payload);
        console.log(res);
        let localStore_User_Access_key = [];
        localStore_User_Access_key.push(res.data.access_token, res.data.expires_in, res.data.refresh_token, res.data.scope, res.data.token_type);
        console.log(localStore_User_Access_key);
        localStorage.setItem("user_access_key", localStore_User_Access_key)
        stage3(localStore_User_Access_key)
    }

    async function stage3(localStore_User_Access_key){
        const res = await axios.post("http://localhost:8181/profile", localStore_User_Access_key);
        const profileData = res.data;
        console.log(profileData)
        

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
        <button onClick={() => stage2()}>ENTER.... STAGE TWO!!!!</button>
    </main>
  </>
  )
}
