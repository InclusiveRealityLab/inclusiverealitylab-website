import { use, useState } from "react";

import close from "../assets/icons/close.svg";
import menu from "../assets/icons/menu.svg";
import useScrollBeyondVisual from "../hooks/useScrollBeyondVisual";
import useScrollDirection from "../hooks/useScrollDirection";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Change this threshold value (in pixels) according to the design specification, current placeholder image height is 800px
  const isScrolledBeyondVisual = useScrollBeyondVisual(800);

  const scrollDirection = useScrollDirection();


  let bgClass = "";
  bgClass = "bg-transparent";

  if (isOpen) {
    bgClass = "bg-black";
  } else if (isScrolledBeyondVisual) {
    bgClass = "bg-white bg-transparent";
  } else {
    bgClass = "bg-transparent";
  }




  return (
    <>
      <nav
        className={`label fixed top-0 left-1/2 transform -translate-x-1/2 z-50 bg-black flex flex-col xl:flex-row justify-between xl:gap-3 text-baseWhite  xl:max-w-75.5 w-full mx-auto  ${
          bgClass
        } ${scrollDirection === "down" ? "hidden" : "block"} ${!isOpen ? "min-h-fit" : "min-h-screen"}`}
      >
        <ul className="flex flex-row justify-between items-end flex-none xl:flex-row xl:justify-between   py-1 px-1.5 xl:items-center">
          <li className="w-3 cursor-pointer">
            <img src="/logoBlack.svg" alt="logo"></img>
          </li>
          <li className="xl:hidden cursor-pointer" onClick={toggleMenu}>
            <img src={isOpen ? close : menu} alt="toggle menu button"></img>
          </li>
        </ul>

        <ul
          className={`bg-background-black xl:bg-transparent text-baseWhite 
          xl:text-baseBlack flex flex-col flex-1 justify-between items-center px-1.5 xl:py-1.5 py-8  xl:flex-row ${
            isOpen ? "block" : "hidden"
          } xl:flex `}
        >
          <li>home</li>
          <li>projects</li>
          <li>publications</li>
          <li>people</li>
          <ul className="xl:flex-row xl:justify-between xl:gap-3 gap-1.5 flex flex-col">
            <li>
              <button className="buttonPrimary bg-baseWhite xl:bg-background-black text-baseBlack xl:text-baseWhite">
                join us
              </button>
            </li>
            <li>
              <button className="buttonPrimary  text-baseWhite  xl:text-baseBlack border-white xl:border-baseBlack">
                keep in touch
              </button>
            </li>
          </ul>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
