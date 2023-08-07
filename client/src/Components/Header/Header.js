import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <h1>Spotifind</h1>
      <nav>
        <ul>
          <li className="home">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="about">
            <Link to={"/about"}>About</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
