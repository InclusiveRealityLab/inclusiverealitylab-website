import { useRef, useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import Carousel from "../components/Carousel";
import NewsListItem from "../components/NewsListItem";
import PublicationContainer from "../components/PublicationsContainer";
import PublicationSectionWrapper from "../components/wrappers/PublicationSectionWrapper";
import useCustomCentering from "../hooks/useCustomCentering";
import extractData from "../utils/extractData";
import LoadingSpinner from "../components/LoadingSpinner";
import Background from "../components/animations/Background";
import DesktopBackground from "../components/animations/DesktopBackground";

function LandingPage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const marginRef = useRef();
  useCustomCentering(marginRef);

  // State
  const [news, setNews] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [featuredPublications, setFeaturedPublications] = useState([]);

  const [isNewsLoading, setIsNewsLoading] = useState(true);
  const [isProjectsLoading, setIsProjectsLoading] = useState(true);
  const [isPubsLoading, setIsPubsLoading] = useState(true);

  // Load News
  useEffect(() => {
    async function loadNews() {
      try {
        const res = await axios.get(API_BASE_URL, {
          params: { entity: "news", resource: "featured" },
        });
        setNews(extractData(res.data));
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews([]);
      } finally {
        setIsNewsLoading(false);
      }
    }
    loadNews();
  }, []);

  // Load Featured Projects
  useEffect(() => {
    async function loadFeaturedProjects() {
      try {
        const res = await axios.get(API_BASE_URL, {
          params: { entity: "projects", resource: "featured" },
        });
        setFeaturedProjects(extractData(res.data));
      } catch (error) {
        console.error("Error fetching projects:", error);
        setFeaturedProjects([]);
      } finally {
        setIsProjectsLoading(false);
      }
    }
    loadFeaturedProjects();
  }, []);

  // Load Featured Publications
  useEffect(() => {
    async function loadFeaturedPublications() {
      try {
        const res = await axios.get(API_BASE_URL, {
          params: { entity: "publications", resource: "featured" },
        });
        setFeaturedPublications(extractData(res.data));
      } catch (error) {
        console.error("Error fetching publications:", error);
        setFeaturedPublications([]);
      } finally {
        setIsPubsLoading(false);
      }
    }
    loadFeaturedPublications();
  }, []);

  return (
    <div className="xl:flex xl:flex-col xl:justify-between xl:items-center">
      <div className="relative w-screen h-auto z-0">
        {/* Hero Image / Key Visual Section*/}
        <div className="w-screen xl:h-50 h-[560px] z-15">
          <video
            className="xl:w-full w-full h-full object-cover block motion-reduce:hidden"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            {/*  WebM  for chrome */}
            <source
              src={`${import.meta.env.BASE_URL}images/keyVisual/irl_intro.webm`}
              type='video/webm; codecs="vp9,opus"'
            />
            {/* mp4 for Safari */}
            <source
              src={`${import.meta.env.BASE_URL}images/keyVisual/irl_intro.mp4`}
              type='video/mp4; codecs="avc1.42E01E,mp4a.40.2"'
            />
          </video>

          {/* <div className="absolute xl:top-[440px] top-[240px] xl:left-[116px] left-1.5 right-1.5 xl:max-w-[592px]  max-w-[472px] min-w-[272px] mx-auto xl:m-0 z-20 flex flex-col justify-center items-start px-1.5 py-3 xl:p-5 bg-background-white gap-1.5">
            <div className="body">Hi, welcome to Inclusive Reality Lab 👋</div>
            <div className="heading3">
              We envision a future where technology seamlessly bridges social
              and ability gaps, fostering an inclusive and prosocial world.
            </div>
          </div> */}

          {/* Desktop version intro box */}
          <div className="hidden xl:block xl:absolute xl:top-[440px] xl:w-[1208px] xl:left-0 xl:right-0 xl:mx-auto ">
            <div className="absolute xl:static top-[240px] xl:left-[116px] left-1.5 right-1.5 xl:right-0 xl:max-w-[592px]  max-w-[472px] min-w-[272px] mx-auto xl:m-0 z-100 flex flex-col justify-center items-start px-1.5 py-3 xl:p-5 bg-background-white gap-1.5">
              <div className="body">
                Hi, welcome to Inclusive Reality Lab 👋
              </div>
              <div className="heading3">
                We envision a future where technology seamlessly bridges social
                and ability gaps, fostering an inclusive and prosocial world.
              </div>
            </div>
          </div>
          {/* Mobile version intro box */}

          <div className="xl:hidden absolute top-[240px]  left-1.5 right-1.5   max-w-[472px] min-w-[272px] mx-auto  z-20 flex flex-col justify-center items-start px-1.5 py-3 xl:p-5 bg-background-white gap-1.5">
            <div className="body">Hi, welcome to Inclusive Reality Lab 👋</div>
            <div className="heading3">
              We envision a future where technology seamlessly bridges social
              and ability gaps, fostering an inclusive and prosocial world.
            </div>
          </div>
        </div>

        {/* Gradient Background */}

        <Background className="" />

        <div className="relative z-0">
          {/* Three Themes Section */}
          <div className="flex flex-col justify-between items-center xl:my-8 xl:py-0 py-8  max-[400px]:mt-[240px] sm:mt-0 mx-1.5 gap-1.5 xl:max-w-64.5 xl:mx-auto">
            <p className="heading3 text-center">
              Our work centers on three key themes
            </p>

            <div className="flex flex-col xl:flex-row items-center justify-between gap-1.5">
              {["Understand", "Assist", "Augment"].map((title, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-center items-center gap-1"
                >
                  <p className="heading2">{title}</p>
                  <p className="body text-center">
                    {title === "Assist"
                      ? "Designing technologies that support individuals and foster better collaboration."
                      : title === "Understand"
                      ? "Exploring ways to sense and interpret cognitive, behavioral, and emotional states."
                      : "Empowering diverse people by enhancing their abilities in meaningful, inclusive ways."}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects Carousel */}
          <section className="relative xl:mx-auto bg-background-black  xl:px-0 xl:max-w-[1208px] min-h-[708px]">
            {isProjectsLoading ? (
              <LoadingSpinner />
            ) : (
              <Carousel movementAmount="480" projects={featuredProjects} />
            )}
          </section>

          {/* Mission Text */}
          <div className="relative z-10 heading3 xl:max-w-64.5 my-8 mx-1.5 xl:mx-auto">
            {/* main cause of vertical overflow of gradient background!!! */}
            <Background className="" />
            Our research explores how reality itself - both physical and digital
            - can be leveraged to understand cognitive, behavioral, and
            emotional states, assist individuals in their daily lives, and
            augment human abilities. <br />
            By designing adaptive and empowering technologies, we aim to create
            a world where diverse individuals can thrive, connect, and reach
            their full potential.
          </div>

          {/* Featured Publications Section */}
          <PublicationSectionWrapper headingContent="Recent Publications">
            {isPubsLoading ? (
              <LoadingSpinner />
            ) : (
              <PublicationContainer publications={featuredPublications} />
            )}
            <Link
              to="/publications"
              className="label xl:self-end xl:w-[242px] w-[176px] text-center p-0.5 py-[11px] transition ease-in duration-200 hover:bg-background-secondary/40"
            >
              <span className="hidden xl:inline">view all publications</span>
              <span className="xl:hidden inline">view more works</span>
            </Link>
          </PublicationSectionWrapper>

          {/* Gradient Background */}

          <Background className="h-[90vh]" />

          {/* News Section */}
          <section className="flex flex-col mx-auto py-5 px-1.5 xl:max-w-64.5 gap-4 z-100 bg-transparent ">
            <h1 className="heading1">News</h1>
            <div className="custom-scrollbar flex flex-col h-12.5 gap-1.5 overflow-y-scroll">
              {isNewsLoading ? (
                <LoadingSpinner />
              ) : news.length === 0 ? (
                <p>No news available at the moment.</p>
              ) : (
                news.map((newsItem, index) => (
                  <NewsListItem news={newsItem} key={index} />
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
