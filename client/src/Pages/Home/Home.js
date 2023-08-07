import React from "react";
import { Helmet } from "react-helmet-async";
import Form from '../../Components/Form/Form'

export default function Home() {

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
        <Form />
      </main>
    </>
  );
}
