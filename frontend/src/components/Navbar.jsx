import { use, useState } from "react";

import close from "../assets/icons/close.svg";
import menu from "../assets/icons/menu.svg";
import useScrollBeyondVisual from "../hooks/useScrollBeyondVisual";
import useScrollDirection from "../hooks/useScrollDirection";
import Modal from "./modals/Modal";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
      {/* <Modal /> */}
      <nav
        className={`label fixed top-0 left-1/2 transform -translate-x-1/2 z-50 bg-black flex flex-col xl:flex-row justify-between xl:gap-3 text-baseWhite  xl:max-w-75.5 w-full mx-auto  ${bgClass} ${
          scrollDirection === "down" ? "hidden" : "block"
        } ${!isOpen ? "min-h-fit" : "min-h-screen"}`}
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
              <button
                className="buttonPrimary bg-baseWhite xl:bg-background-black text-baseBlack xl:text-baseWhite"
                onClick={() => handleOpenJoinModal()}
              >
                join us
              </button>
              {isModalOpenJoin && (
                <Modal
                  onClose={() => setIsModalOpenJoin(false)}
                  type={modalType}
                >
                  <div className="gap-2">
                    <h1 className="heading1">
                      Looking for opportunities to join us?
                    </h1>
                    <p className="body">
                      As a new lab, we’re open to conversations and
                      collaborations in many forms. Feel free to explore our
                      projects and publications, if our work at the Inclusive
                      Reality Lab resonates with your interests, don’t hesitate
                      to reach out at inclusiverealitylab@gmail.com. Someone
                      from our team or our director will be happy to get back to
                      you soon.
                    </p>
                  </div>
                </Modal>
              )}
            </li>
            <li>
              <button
                className="buttonPrimary  text-baseWhite  xl:text-baseBlack border-white xl:border-baseBlack"
                onClick={() => handleOpenContactModal()}
              >
                keep in touch
              </button>
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
                        inclusiverealitylab@gmail.com, we will get back to you
                        soon.
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-1.5">
                      <input type="text" name="contactName" placeholder="Name" className="bg-background-white w-full h-2.5 border-1 border-black px-1 body" />
                      <input type="email" name="contactEmail" placeholder="Email" className="bg-background-white w-full h-2.5 border-1 border-black px-1 body" />
                      <textarea type="text" name="contactEmail" placeholder="Message" className="bg-background-white w-full h-10 border-1 border-black px-1 py-0.5 body" />
                      <button className="label text-white text-center px-0.5 py-0.5 bg-background-black w-full h-2.5">send</button>

                    </div>
                  </div>
                </Modal>
              )}
            </li>
          </ul>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
