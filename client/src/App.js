import "./App.css";
import React from "react";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Callback from "./Pages/Callback/Callback";
import Library from "./Pages/Library/Library";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/library" element={<Library />} />
            <Route path="/callback" element={<Callback />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
