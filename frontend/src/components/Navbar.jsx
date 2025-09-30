import { useEffect, useState, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";

import close from "../assets/icons/close.svg";
import menu from "../assets/icons/menu.svg";
import useScrollBeyondVisual from "../hooks/useScrollBeyondVisual";
import useScrollDirection from "../hooks/useScrollDirection";
import Modal from "./modals/Modal";
import { Link } from "react-router";
import NavigationTab from "./tabs/NavigationTab";
import ButtonPrimary from "./buttons/ButtonPrimary";
import ButtonSecondary from "./buttons/ButtonSecondary";
import axios from "axios";
import check from "../assets/icons/check.svg";
import processing from "../assets/icons/processing.svg";
import SocialMediaHandleContainer from "./SocialMediaHandleContainer";
import JoinModal from "./modals/JoinModal";
import ContactModal from "./modals/ContactModal";

const POST_API = import.meta.env.VITE_API_POST_BASE_URL;

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

  const [modalType, setModalType] = useState(null);
  const [isModalOpenJoin, setIsModalOpenJoin] = useState(false);
  const [isModalOpenContact, setIsModalOpenContact] = useState(false);

  const handleOpenJoinModal = () => {
    setIsModalOpenJoin(true);
    setModalType("join");
  };

  const handleOpenContactModal = () => {
    setIsModalOpenContact(true);
    setModalType("contact");
  };

  // handling the form submission for the contact form inside the contact modal
  const nameReference = useRef();
  const emailReference = useRef();
  const messageReference = useRef();

  const [status, setStatus] = useState("Send");

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setStatus("Sending");

    const form = new FormData();
    form.append("name", nameReference.current.value);
    form.append("email", emailReference.current.value);
    form.append("message", messageReference.current.value);

    try {
      const response = await fetch(POST_API, {
        method: "POST",
        body: form, // No headers needed for FormData
      });

      const result = await response.json(); // Parses JSON string returned from Apps Script
     

      if (result.success) {
        setStatus("Sent");
        setTimeout(() => {
          setStatus("Send");
          nameReference.current.value = "";
          emailReference.current.value = "";
          messageReference.current.value = "";
        }, 1000);
      } else {
        setStatus("Failed.");
      }
    } catch (error) {
      console.error("❌ Fetch error:", error);
      setStatus("Failed");
      // this alerts the user about an error processing the message and closes the modal
      alert("Sorry there was an error sending your message, try again later");
      setIsModalOpenContact(false);
    }
  };

  // Change this threshold value (in pixels) according to the design specification, current placeholder image height is 800px for the visual in the landing page

  const location = useLocation();
  const scrollThreshold = useMemo(() => {
    return location.pathname === "/" ? 800 : 10;
  }, [location.pathname]);

  const isScrolledBeyondVisual = useScrollBeyondVisual(scrollThreshold);

  const scrollDirection = useScrollDirection();

  let bgClass = "";
  bgClass = "bg-transparent";

  let isGradientUnderlayAdded = false;

  if (isOpen) {
    bgClass = "bg-black";
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
      {/* <Modal /> */}
      <div
        className={`flex w-screen fixed top-0 left-1/2 transform -translate-x-1/2 z-50 ${bgClass}  ${
          scrollDirection === "down" && isScrolledBeyondVisual
            ? "hidden"
            : "block"
        } ${!isOpen ? "min-h-fit" : "min-h-screen"} `}
      >
        {" "}
        {isGradientUnderlayAdded && (
          <div className="fixed top-[-50px]  w-full h-[200px] bg-gradient-to-b from-white/25 to-white/0 flex flex-row items-center justifiy-between px-2 -z-10"></div>
        )}
        <nav
          className={`label flex flex-col xl:flex-row justify-between  text-baseWhite xl:max-w-75.5 w-full mx-auto xl:py-0.25 `}
        >
          <ul className="flex flex-row justify-between items-end flex-none xl:flex-row xl:justify-between  py-1 px-1.5 xl:px-0 xl:items-center">
            <li className="w-[55px] h-[32px]  xl:w-full xl:h-full cursor-pointer">
              <Link to="/">
                <img
                  src={`${import.meta.env.BASE_URL}IRL_logo_icon.svg`}
                  alt="logo"
                ></img>
              </Link>
            </li>
            <li
              className="xl:hidden cursor-pointer w-[40px] h-[40px]"
              onClick={toggleMenu}
            >
              <img src={isOpen ? close : menu} alt="toggle menu button"></img>
            </li>
          </ul>

          <ul
            className={`bg-background-black xl:bg-transparent text-baseWhite 
          xl:text-baseBlack flex flex-col flex-1 xl:justify-end justify-center items-center  xl:gap-2.5 gap-1.5 xl:px-0 xl:py-1.5   py-8  xl:flex-row ${
            isOpen ? "block" : "hidden"
          } xl:flex `}
          >
            <li>
              <NavigationTab
                label="home"
                linkAddress="/"
                onClick={handleCloseMenuMobile}
              />
            </li>
            <li>
              <NavigationTab
                label="projects"
                linkAddress="/projects"
                onClick={handleCloseMenuMobile}
              />
            </li>
            <li>
              <NavigationTab
                label="publications"
                linkAddress="/publications"
                onClick={handleCloseMenuMobile}
              />
            </li>
            <li>
              <NavigationTab
                label="people"
                linkAddress="/people"
                onClick={handleCloseMenuMobile}
              />
            </li>
            <ul className="xl:flex-row xl:justify-between xl:gap-2.5 gap-1.5 flex flex-col">
              <li>
                <ButtonPrimary
                  label="join us"
                  onClick={() => handleOpenJoinModal()}
                />

                {isModalOpenJoin && (
                  <JoinModal
                    onClose={() => setIsModalOpenJoin(false)}
                    
                    backgroundColor={`bg-background-secondary`}
                  />
                )}
              </li>
              <li>
                <ButtonSecondary
                  label="keep in touch"
                  onClick={() => handleOpenContactModal()}
                />
                {isModalOpenContact && (
                  
                  <ContactModal onClose={() => setIsModalOpenContact(false)}
                    
                    backgroundColor={`bg-background-tertiary`} />
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
