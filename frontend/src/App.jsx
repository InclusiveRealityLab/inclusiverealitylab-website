import { useState } from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import "./App.css";

import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        
          <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
       
        
      </BrowserRouter>
    </>
  );
}

export default App;
