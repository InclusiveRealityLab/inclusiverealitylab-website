import { useState } from "react";

import close from "../assets/icons/close.svg";
import menu from "../assets/icons/menu.svg";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className=" flex w-screen bg-background-black">
        <nav
          className={`label fixed top-0 left-1/2 transform -translate-x-1/2 z-50 bg-black flex flex-col xl:flex-row justify-between xl:gap-3 text-baseWhite min-h-screen xl:min-h-fit xl:max-w-75.5 w-full  mx-auto  xl:border-6 border-amber-500 xl:bg-transparent ${
            !isOpen && "bg-transparent"
          } `}
        >
          <ul class="flex flex-row justify-between items-end flex-none xl:flex-row xl:justify-between xl:border-2 border-violet-500  py-1 px-1.5 xl:items-center">
            <li className="w-3 cursor-pointer">
              <img src="/logoBlack.svg" alt="logo"></img>
            </li>
            <li className="xl:hidden cursor-pointer" onClick={toggleMenu}>
              <img src={isOpen ? close : menu} alt="toggle menu button"></img>
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
            <ul className="xl:flex-row xl:justify-between xl:gap-3 gap-1.5 flex flex-col">
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
      </div>
    </>
  );
}

export default Navbar;
