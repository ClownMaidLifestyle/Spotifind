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
        <div className="about">
          <h2>About</h2>
          <p>
            What is it? Spotifind is a single page web app that utilised the
            Spotify API to allow a user to search through the full spotify
            database of songs The problem: The spotify in-app search feature is
            rather minimal and doesn't allow the user to apply filters to the
            full extent that the search query is capable of, Spotifind will
            allow users to more accurately search songs
          </p>
        <h2>The Team:</h2>
        
          Here is the information about the creators of this website
        

        <h3 className="developer">Elisa, (github link) (linkedin link)</h3>
        <h3 className="developer">Shaylee, (github link) (linkedin link)</h3>
        <h3 className="developer">Joe, (github link) (linkedin link)</h3>
        <h3 className="developer">Nick, (github link) (linkedin link)</h3>
        <p className="moreInfo">
          If you would like to look at the code please feel free at the GitHub
          link below
        </p>
        <a
          className="github"
          href="https://github.com/ClownMaidLifestyle/Spotifind"
        >
          GitHub
        </a>
                </div>

      </main>
    </>
  );
}
