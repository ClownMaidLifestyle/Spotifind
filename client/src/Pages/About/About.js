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
            The problem: The spotify in-app search feature is rather minimal and
            doesn't allow the user to apply filters to the full extent that the
            search query is capable of, Spotifind will allow users to more
            accurately search songs
            <hr></hr>
            &nbsp; The Team: Elisa, (github link) (linkedin link) Shaylee,
            (github link) (linkedin link) Joe, (github link) (linkedin link)
            Nick, (github link) (linkedin link) If you would like to look at the
            code please feel free at the GitHub link below
            <a
              className="github"
              href="https://github.com/ClownMaidLifestyle/Spotifind"
            >
              GitHub
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
