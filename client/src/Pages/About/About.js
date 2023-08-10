import React from "react";
import { Helmet } from "react-helmet-async";
import "./About.css";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Spotifind</title>
        <meta
          name="description"
          content="This is the about page for Spotifind"
        />
        <link rel="canonical" href="/about" />
      </Helmet>
      <main>
        <div className="description">
          <h2>About</h2>
          <p className="about">
            Spotifind is a single page web app that utilised the Spotify API to
            allow a user to search through the full spotify database of songs
            The problem: <br></br>The spotify in-app search feature is rather
            minimal and doesn't allow the user to apply filters to the full
            extent that the search query is capable of, <br></br>Spotifind will
            allow users to more accurately search songs<br></br>
            <br></br>
            <hr></hr>
            <br></br>
            &nbsp;{" "}
            <span>
              The Team: <br></br> <br></br>
            </span>
            Elisa <br></br>
            https://github.com/ClownMaidLifestyle<br></br>
            Shaghayegh<br></br>
            https://github.com/shaghayegh-asadi69<br></br>
            https://www.linkedin.com/in/shaghayegh-asadi-167897201/
            <br></br>
            Joe<br></br>
            Github - https://github.com/jow76<br></br>
            Nick<br></br>
            https://github.com/langfordlewis1984&nbsp;
            https://www.linkedin.com/in/langfordlewis/
            <br></br>
            <br></br>
            If you would like to look at the code please feel free at the GitHub
            link below &nbsp; <br></br> <br></br> <br></br>
            <a
              className="github"
              href="https://github.com/ClownMaidLifestyle/Spotifind"
            >
              GitHub
            </a>
          </p>
          <br></br>
          <br></br>
        </div>
      </main>
    </>
  );
}
