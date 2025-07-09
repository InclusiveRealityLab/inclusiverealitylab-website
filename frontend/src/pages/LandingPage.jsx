import Navbar from "../components/Navbar";

import PublicationListItem from "../components/PublicationListItem";
import NewsListItem from "../components/NewsListItem";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import useCustomCentering from "../hooks/useCustomCentering";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import Carousel from "../components/Carousel";
import PublicationContainer from "../components/PublicationsContainer";
import PublicationSectionWrapper from "../components/wrappers/PublicationSectionWrapper";
import publications from "../sampleData/publications";

function LandingPage() {
  const marginRef = useRef();
  useCustomCentering(marginRef);

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

        <div className="relative w-screen h-auto z-0">
          {/* for the gradient background */}

          <div className="absolute top-4 -left-5 right-0 bottom-4 xl:bg-[url(/background/background_desktop.svg)] bg-[url(/background/background_mobile.svg)] bg-cover bg-no-repeat blur-[240px] -z-10"></div>

          <div className="relative z-10">
            <div className="flex flex-col justify-between items-center xl:my-8 xl:py-0 py-8 mx-1.5 gap-1.5 xl:max-w-64.5 xl:mx-auto  ">
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

            <p className="heading3 xl:max-w-64.5 my-8 mx-1.5 xl:mx-auto ">
              Our research explores how reality itself - both physical and
              digital - can be leveraged to understand cognitive, behavioral,
              and emotional states, assist individuals in their daily lives, and
              augment human abilities. <br />
              By designing adaptive and empowering technologies, we aim to
              create a world where diverse individuals can thrive, connect, and
              reach their full potential.
            </p>

            <PublicationSectionWrapper headingContent="Recent Publications">
              <PublicationContainer publications={publications.slice(0, 4)} />
              <Link to="/publications" className="xl:self-end">
                <p className="labelBold">view all publications</p>
              </Link>
            </PublicationSectionWrapper>

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
      </div>
    </>
  );
}

export default LandingPage;
