import "./App.css";
import React from "react";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Callback from "./Pages/Callback/Callback"

// import LoginButton from "./Login";
// import LogoutButton from "./Logout";
// import Profile from "./Profile";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div>
          <Header />
          {/* <LoginButton />
          <LogoutButton />
          <Profile /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/callback" element={<Callback/>} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
