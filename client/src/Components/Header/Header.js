import "./Header.css";
// Header.js
import React from "react";
import { Link } from "react-router-dom";
import logo from "../Images/img.png"

const Header = () => {
  let userData = localStorage.getItem("display_name");
  let displayName = userData
  console.log(displayName)
  return (
    <header className="navbar">
      <nav>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <ul>
          <li>
            <Link reloadDocument to="/#">Home</Link>
          </li>
          <li>
            <Link reloadDocument to="/library">Library</Link>
          </li>
          <li>
            <Link reloadDocument to="/about">About</Link>
          </li>
        </ul>
      </nav>
      {displayName && <div>Welcome, {displayName}</div>}
    </header>
  );
};

export default Header;
