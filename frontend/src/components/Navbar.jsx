import { useState } from "react";

import close from "../assets/icons/close.svg";
import menu from "../assets/icons/menu.svg";

function Navbar() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav
        className={`label bg-black flex flex-col xl:flex-row justify-between xl:gap-3 text-baseWhite min-h-screen xl:min-h-fit xl:w-full xl:px-7 xl:border-6 border-amber-500 xl:bg-baseWhite ${
          !isOpen && "bg-transparent"
        } `}
      >
        <ul class="flex flex-row justify-between items-end flex-none xl:flex-row xl:justify-between xl:border-2 border-violet-500  py-1 px-1.5 xl:items-center">
          <li className="w-3">
            <img src="/logoBlack.svg"></img>
          </li>
          <li class="xl:hidden" onClick={toggleMenu}>
            <img src={isOpen ? close : menu}></img>
          </li>
        </ul>

        <ul
          className={`bg-background-black xl:bg-transparent text-baseWhite 
          xl:text-baseBlack flex flex-col flex-1 justify-between items-center px-1.5 xl:py-1.5 py-8 xl:border-6 border-green-500 xl:flex-row ${
            isOpen ? "block" : "hidden"
          } xl:flex `}
        >
          <li>home</li>
          <li>projects</li>
          <li>publications</li>
          <li>people</li>
          <ul className= "xl:flex-row xl:justify-between xl:gap-3 gap-1.5 flex flex-col">
            <li>
              <button class="buttonPrimary bg-baseWhite xl:bg-background-black text-baseBlack xl:text-baseWhite">
                join us
              </button>
            </li>
            <li>
              <button class="buttonPrimary  text-baseWhite  xl:text-baseBlack border-white xl:border-baseBlack">
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
