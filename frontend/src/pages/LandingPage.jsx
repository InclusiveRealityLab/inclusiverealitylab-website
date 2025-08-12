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
      {/* Hero Image / Key Visual Section*/}
      <div className="w-screen h-50 flex">
        <video
          className="xl:w-full h-full object-cover block motion-reduce:hidden"
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

        <div className="absolute xl:left-6 mx-1.5 xl:top-27.5 top-16 max-w-37 min-w-20.45 z-10 flex flex-col justify-center items-start px-1.5 py-3 xl:p-5 bg-background-white gap-1.5">
          <p className="body">Hi, welcome to Inclusive Reality Lab 👋</p>
          <p className="heading3">
            We envision a future where technology seamlessly bridges social and
            ability gaps, fostering an inclusive and prosocial world.
          </p>
        </div>
      </div>

      <div className="relative w-screen h-auto z-0">
        {/* Gradient Background */}
        <div className="absolute top-20 -left-5 right-0 bottom-4 xl:bg-[url(/background/background_desktop.svg)] bg-[url(/background/background_mobile.svg)] bg-cover bg-no-repeat blur-[240px] -z-10"></div>

        <div className="relative z-10">
          {/* Three Themes Section */}
          <div className="flex flex-col justify-between items-center xl:my-8 xl:py-0 py-8 mx-1.5 gap-1.5 xl:max-w-64.5 xl:mx-auto">
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
          <section className="relative border-2 bg-baseBlack xl:ml-8">
            {isProjectsLoading ? (
              <LoadingSpinner/>
            ) : (
              <Carousel movementAmount="480" projects={featuredProjects} />
            )}
          </section>

          {/* Mission Text */}
          <p className="heading3 xl:max-w-64.5 my-8 mx-1.5 xl:mx-auto">
            Our research explores how reality itself - both physical and digital
            - can be leveraged to understand cognitive, behavioral, and
            emotional states, assist individuals in their daily lives, and
            augment human abilities. <br />
            By designing adaptive and empowering technologies, we aim to create
            a world where diverse individuals can thrive, connect, and reach
            their full potential.
          </p>

          {/* Featured Publications Section */}
          <PublicationSectionWrapper headingContent="Recent Publications">
            {isPubsLoading ? (
              <LoadingSpinner/>
            ) : (
              <PublicationContainer publications={featuredPublications} />
            )}
            <Link to="/publications" className="xl:self-end">
              <p className="label p-0.5 py-[11px] transition ease-in duration-200 hover:bg-background-secondary/40">
                view all publications
              </p>
            </Link>
          </PublicationSectionWrapper>

          {/* News Section */}
          <section className="flex flex-col mx-auto py-5 px-1.5 xl:max-w-64.5 gap-4">
            <h1 className="heading1">News</h1>
            <div className="custom-scrollbar flex flex-col h-12.5 gap-1.5 overflow-y-scroll">
              {isNewsLoading ? (
                <LoadingSpinner/>
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
