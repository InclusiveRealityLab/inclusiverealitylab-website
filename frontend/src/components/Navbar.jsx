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
      console.log("✅ Server result:", result);

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
          <div class="fixed top-[-50px]  w-full h-[200px] bg-gradient-to-b from-white/25 to-white/0 flex flex-row items-center justifiy-between px-2 -z-10"></div>
        )}
        <nav
          className={`label flex flex-col xl:flex-row justify-between xl:gap-3 text-baseWhite  xl:max-w-75.5 w-full mx-auto  `}
        >
          <ul className="flex flex-row justify-between items-end flex-none xl:flex-row xl:justify-between   py-1 px-1.5 xl:items-center">
            <li className="w-3 cursor-pointer">
              <Link to="/">
                <img src={`${import.meta.env.BASE_URL}logoBlack.svg`} alt="logo"></img>
              </Link>
            </li>
            <li className="xl:hidden cursor-pointer" onClick={toggleMenu}>
              <img src={isOpen ? close : menu} alt="toggle menu button"></img>
            </li>
          </ul>

          <ul
            className={`bg-background-black xl:bg-transparent text-baseWhite 
          xl:text-baseBlack flex flex-col flex-1 justify-center items-center  gap-1.5 px-1.5 xl:py-1.5 py-8  xl:flex-row ${
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
            <ul className="xl:flex-row xl:justify-between xl:gap-3 gap-1.5 flex flex-col">
              <li>
                <ButtonPrimary
                  label="join us"
                  onClick={() => handleOpenJoinModal()}
                />

                {isModalOpenJoin && (
                  <Modal
                    onClose={() => setIsModalOpenJoin(false)}
                    type={modalType}
                  >
                    <h1 className="heading1 overflow-wrap hyphens-auto">
                      Looking for opportunities to join us?
                    </h1>
                    <p className="body">
                      As a new lab, we’re open to conversations and
                      collaborations in many forms. Feel free to explore our
                      projects and publications, if our work at the Inclusive
                      Reality Lab resonates with your interests, don’t hesitate
                      to reach out at inclusiverealitylab[at]gmail.com.{" "}
                      <br></br>Someone from our team or our director will be
                      happy to get back to you soon. <br></br> Feel free to
                      follow our social media accounts as well.
                    </p>
                    <SocialMediaHandleContainer iconColor="blk" />
                  </Modal>
                )}
              </li>
              <li>
                <ButtonSecondary
                  label="keep in touch"
                  onClick={() => handleOpenContactModal()}
                />
                {isModalOpenContact && (
                  <Modal
                    onClose={() => setIsModalOpenContact(false)}
                    type={modalType}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2 ">
                        <h1 className="heading1">Let's keep in touch!</h1>
                        <p className="body">
                          Drop a message to say hi, or send an email to
                          inclusiverealitylab[at]gmail.com, we will get back to
                          you soon. <br></br> Feel free to follow our social media
                          accounts as well.
                        </p>
                        {/* <SocialMediaHandleContainer iconColor="blk"/> */}

                      </div>
                      <form
                        onSubmit={handleFormSubmission}
                        className="flex flex-col items-center justify-between gap-1.5"
                      >
                        <input
                          type="text"
                          name="contactName"
                          ref={nameReference}
                          placeholder="Name"
                          className="bg-background-white w-full h-2.5 border-1 border-black px-1 body"
                        />
                        <input
                          type="email"
                          name="contactEmail"
                          ref={emailReference}
                          placeholder="Email"
                          className="bg-background-white w-full h-2.5 border-1 border-black px-1 body"
                        />
                        <textarea
                          type="text"
                          name="message"
                          ref={messageReference}
                          placeholder="Message"
                          className="bg-background-white w-full h-10 border-1 border-black px-1 py-0.5 body"
                        />
                        <button
                          className={`label text-white text-center  ${
                            status == "Sent"
                              ? "bg-background-secondary py-[4px] px-3.5"
                              : "bg-background-black py-[4px] " 
                          } bg-background-black w-full h-2.5 hover:text-secondary`}
                          type="submit"
                        >
                          {status === "Sending" ? (
                            <span className="flex items-center justify-center">
                              <img
                                src={processing}
                                alt="processing"
                                className="w-2 h-2"
                              />
                            </span>
                          ) : status === "Sent" ? (
                            <span className="flex items-center justify-center">
                              <img
                                src={check}
                                alt="checkmark"
                                className="w-2 h-2"
                              />
                            </span>
                          ) : (
                            "Send"
                          )}
                        </button>
                      </form>
                    </div>
                  </Modal>
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
