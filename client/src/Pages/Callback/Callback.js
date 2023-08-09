import React from 'react'
import { useEffect} from "react"
import { Helmet } from "react-helmet-async"
import axios from "axios"

export default function Callback() {

    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    localStorage.setItem('userAuthCode', code);
    
    stage2();

    })

    async function stage2(code){
        const res = await axios.get("http://localhost:8181/userAuthStag2")
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
    </main>
  </>
  )
}
