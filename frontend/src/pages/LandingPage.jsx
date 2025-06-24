import Navbar from "../components/Navbar";
import gradientBackground from "../assets/gradientBackground.svg";
import PublicationListItem from "../components/PublicationListItem";
import NewsListItem from "../components/NewsListItem";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import useCustomCentering from "../hooks/useCustomCentering";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Carousel from "../components/Carousel";
import PublicationContainer from "./PublicationsContainer.jsx";

function LandingPage() {
  const marginRef = useRef();
  useCustomCentering(marginRef);

  const projects = [
    { id: 1, title: "Project one sample name" },
    { id: 2, title: "Project two sample name" },
    { id: 3, title: "Project three sample name" },
    { id: 4, title: "Project four sample name" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const handleMoveRight = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handleMoveLeft = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <>
      <div className="  xl:flex xl:flex-col xl:justify-between xl:items-center ">
        {/* img container */}
        <div className="w-screen h-50 flex">
          {/* intro container */}

          <img
            src="/HeroImage.png"
            alt="Hero"
            className="xl:w-full h-full object-cover block"
          ></img>
          <div className="absolute xl:left-6 mx-1.5 xl:top-27.5 top-16 max-w-37 min-w-20.45 z-10 flex flex-col justify-center items-start px-1.5 py-3 xl:p-5  bg-background-white gap-1.5  ">
            <p className="body">Hi, welcome to Inclusive Reality Lab 👋</p>
            <p className="heading3">
              We envision a future where technology seamlessly bridges social
              and ability gaps, fostering an inclusive and prosocial world.
            </p>
          </div>
        </div>

        <div className="w-screen h-auto bg-[url(/gradientImage.png)] bg-cover bg-no-repeat border-2">
          {/* for the gradient background */}

          <div className="flex flex-col justify-between items-center xl:my-8 xl:py-0 py-8 mx-1.5 gap-1.5 xl:max-w-64.5 xl:mx-auto border-2 ">
            <p className="heading3">Our work centers on three key themes</p>

            <div className="flex flex-col xl:flex-row items-center justify-between gap-1.5 ">
              <div className="flex flex-col justify-center items-center gap-1 ">
                <p className="heading2">Understand</p>
                <p className="body text-center">
                  Exploring ways to sense and interpret cognitive, behavioral,
                  and emotions states.
                </p>
              </div>

              <div className="flex  flex-col justify-center items-center gap-1">
                <p className="heading2">Assist</p>
                <p className="body text-center">
                  Designing technologies that support individuals and foster
                  better collaboration.
                </p>
              </div>

              <div className="flex flex-col justify-center items-center gap-1">
                <p className="heading2">Augment</p>
                <p className="body text-center">
                  Exploring ways to sense and interpret cognitive, behavioral,
                  and emotions states.
                </p>
              </div>
            </div>
          </div>

          <section className="relative border-2 bg-baseBlack xl:ml-8   ">
            <Carousel movementAmount="480" />
          </section>

          <p className="heading3 xl:max-w-64.5 my-8 mx-1.5 xl:mx-auto border-2">
            Our research explores how reality itself - both physical and digital
            - can be leveraged to understand cognitive, behavioral, and
            emotional states, assist individuals in their daily lives, and
            augment human abilities. <br />
            By designing adaptive and empowering technologies, we aim to create
            a world where diverse individuals can thrive, connect, and reach
            their full potential.
          </p>

          {/* <section className="flex flex-col bg-background-white xl:justify-items-start items-start w-screen ">
            <div className="flex flex-col justify-between items-start xl:items-center py-5 gap-4 xl:w-64.5 mx-auto border-2 bg-basewhite">
              <h1 className="heading1 self-start ">Recent Publications </h1>

              <div className="flex xl:flex-col flex-row flex-wrap  xl:justify-between  items-start xl:items-center xl:gap-2 gap-x-1.5 gap-y-2.5 ">
               
                <PublicationListItem />
                <PublicationListItem />
                <PublicationListItem />
                <PublicationListItem />
                <PublicationListItem />
              </div>
              
              <p className="labelBold">view all publications</p>
            </div>
          </section> */}

          <PublicationContainer/>

          <section className="flex flex-col mx-auto py-5 px-1.5 xl:max-w-64.5 gap-4">
            <h1 className="heading1">News</h1>
            {/* news list items container */}
            <div className="flex flex-col h-12.5 gap-1.5 overflow-y-scroll border-3 ">
              {/* news list item */}
              {/* will use a mapping function to return the latest news once backend is ready! */}

              <NewsListItem />
              <NewsListItem />
              <NewsListItem />
              <NewsListItem />
              <NewsListItem />
              <NewsListItem />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
