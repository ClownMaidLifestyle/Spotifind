import "./Header.css";
// Header.js
import React from "react";
import { Link } from "react-router-dom";
import logo from "../Images/img.png"

const Header = () => {
  return (
    <header className="navbar">
      <nav>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <ul>
          <li>
            <Link to="/#">Home</Link>
          </li>
          <li>
            <Link to="/library">Library</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
