import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";

import closeBlack from "../assets/icons/closeBlack.svg";
import menu from "../assets/icons/menu.svg";
import useScrollBeyondVisual from "../hooks/useScrollBeyondVisual";
import useNavbarHidden from "../hooks/useNavbarHidden";
import { Link } from "react-router";
import NavigationTab from "./tabs/NavigationTab";
import ButtonPrimary from "./buttons/ButtonPrimary";
import ButtonSecondary from "./buttons/ButtonSecondary";
import SocialMediaHandleContainer from "./SocialMediaHandleContainer";
import JoinModal from "./modals/JoinModal";
import ContactModal from "./modals/ContactModal";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseMenuMobile = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const [isModalOpenJoin, setIsModalOpenJoin] = useState(false);
  const [isModalOpenContact, setIsModalOpenContact] = useState(false);

  const handleOpenJoinModal = () => {
    setIsModalOpenJoin(true);
  };

  const handleOpenContactModal = () => {
    setIsModalOpenContact(true);
  };


  // Change this threshold value (in pixels) according to the design specification, current placeholder image height is 800px for the visual in the landing page

  const location = useLocation();
  const scrollThreshold = useMemo(() => {
    return location.pathname === "/" ? 800 : 10;
  }, [location.pathname]);

  const isScrolledBeyondVisual = useScrollBeyondVisual(scrollThreshold);

  // Same rule the sticky page title uses, so the two can never disagree.
  const isHidden = useNavbarHidden();

  let bgClass = "";
  bgClass = "bg-transparent";

  let isGradientUnderlayAdded = false;

  if (isOpen) {
    bgClass = "bg-background-white";
  } else if (isScrolledBeyondVisual) {
    bgClass = "bg-white bg-transparent";
  } else {
    bgClass = "bg-transparent";
    isGradientUnderlayAdded = true;
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        className={`flex w-screen fixed top-0 left-1/2 transform -translate-x-1/2 z-50 ${bgClass}  ${
          isHidden ? "hidden" : "block"
        } ${!isOpen ? "min-h-fit" : "min-h-screen"} `}
      >
        {" "}
        {isGradientUnderlayAdded && (
          <div className="fixed top-[-50px]  w-full h-[200px] bg-gradient-to-b from-white/25 to-white/0 flex flex-row items-center justify-between px-2 -z-10"></div>
        )}
        <nav
          className={`label flex flex-col xl:flex-row justify-between text-baseBlack xl:max-w-contentBox w-full mx-auto px-1.5 xl:py-0.25 `}
        >
          {/* Above the menu: when open, the menu spans the whole viewport and
              is pulled up over this row, so its white fill would otherwise
              cover the logo and the close button -- and swallow the click. */}
          <ul className="relative z-10 flex flex-row justify-between items-center flex-none xl:flex-row xl:justify-between py-1 xl:items-center">
            {/* 24 tall on mobile, 32 on desktop. The width follows the logo's
                own 84x48 ratio rather than being pinned, so it can never
                stretch: 42x24 and 56x32. */}
            <li className="cursor-pointer">
              <Link to="/">
                <img
                  src={`${import.meta.env.BASE_URL}IRL_logo_icon.svg`}
                  alt="logo"
                  className="h-1.5 xl:h-2 w-auto"
                ></img>
              </Link>
            </li>
            <li
              className="xl:hidden cursor-pointer w-control h-control"
              onClick={toggleMenu}
            >
              <img
                src={isOpen ? closeBlack : menu}
                alt="toggle menu button"
              ></img>
            </li>
          </ul>

          {/* The open mobile menu centres on the whole screen, per the design:
              the items span 226..586 of an 812 frame, which is dead centre.
              It sits after the 72px header row in the column, so centring on
              the space that is left would put it 36px low -- hence the full
              viewport height pulled back up over the header. Desktop is a row
              in the bar itself and opts out of both. */}
          <ul
            className={`bg-background-white xl:bg-transparent text-baseBlack
          flex flex-col flex-1 h-screen -mt-4.5 xl:h-auto xl:mt-0 xl:justify-end justify-center items-center xl:gap-1 gap-1.5 xl:py-1.5 py-4 xl:flex-row ${
            isOpen ? "block" : "hidden"
          } xl:flex `}
          >
            <li>
              <NavigationTab
                label="Home"
                linkAddress="/"
                onClick={handleCloseMenuMobile}
              />
            </li>
            <li>
              <NavigationTab
                label="Projects"
                linkAddress="/projects"
                onClick={handleCloseMenuMobile}
              />
            </li>
            <li>
              <NavigationTab
                label="Publications"
                linkAddress="/publications"
                onClick={handleCloseMenuMobile}
              />
            </li>
            <li>
              <NavigationTab
                label="People"
                linkAddress="/people"
                onClick={handleCloseMenuMobile}
              />
            </li>
            <ul className="xl:flex-row xl:justify-between xl:gap-1 gap-1.5 flex flex-col items-center">
              <li>
                <ButtonPrimary
                  label="Join Us"
                  onClick={() => handleOpenJoinModal()}
                />

                {isModalOpenJoin && (
                  <JoinModal onClose={() => setIsModalOpenJoin(false)} />
                )}
              </li>
              <li>
                <ButtonSecondary
                  label="Keep in Touch"
                  onClick={() => handleOpenContactModal()}
                />
                {isModalOpenContact && (
                  
                  <ContactModal onClose={() => setIsModalOpenContact(false)} />
                )}
              </li>
            </ul>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
