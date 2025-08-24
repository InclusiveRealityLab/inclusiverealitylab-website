import { useState } from "react";
import { BrowserRouter, HashRouter, Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProjectsPage from "./pages/ProjectsPage";
import PublicationsPage from "./pages/PublicationsPage";
import PeoplePage from "./pages/PeoplePage";
import { useScroll } from "framer-motion";
import useScrollToTop from "./hooks/useScrollToTop";


function App() {
 
  return (
    <>
      <HashRouter>
        <ScrollToTopManager/>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/people" element={<PeoplePage />} />
        </Routes>
        <Footer/>
      </HashRouter>
    </>
  );
}

function ScrollToTopManager(){
  useScrollToTop();
  return null;
}

export default App;

