import "./Header.css";
// Header.js
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/#">Home</Link>
          </li>
          <li>
            <Link to="/client/src/Pages/About">About</Link>
          </li>
        </ul>
       <div className="logo">
              </div>
      </nav>
    </header>
  );
};

export default Header;
