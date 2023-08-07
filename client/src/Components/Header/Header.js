
import "./Header.css";
// Header.js
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/#">Home</Link>
          </li>
          <li>
            <Link to="/#about">About</Link>
          </li>
        </ul>
      </nav>
      <div className="logo">
        <img src="./Header.logo/logo.png" alt="Logo" />
      </div>
    </header>
  );
};

export default Header;

