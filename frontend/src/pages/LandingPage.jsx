import { useRef, useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import Carousel from "../components/Carousel";
import NewsListItem from "../components/NewsListItem";
import PublicationContainer from "../components/PublicationsContainer";
import useCustomCentering from "../hooks/useCustomCentering";
import extractData from "../utils/extractData";
import LoadingSpinner from "../components/LoadingSpinner";
import ButtonText from "../components/buttons/ButtonText";
import Background from "../components/animations/Background";

const THEMES = [
  {
    title: "Understand",
    description: "understanding cognitive and emotional states",
  },
  {
    title: "Assist",
    description: "designing and developing tools to assist users",
  },
  {
    title: "Augment",
    description: "augmenting abilities to push beyond human limitations",
  },
];

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
      {/* one fixed layer for the whole page; content scrolls over it */}
      <Background />
      <div className="relative w-screen h-auto z-0">
        {/* Hero Image / Key Visual Section*/}
        <div className="relative w-screen z-15">
          <video
            className="w-full h-hero xl:h-45.5 object-cover block motion-reduce:hidden"
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

          {/* One 560px box at both breakpoints -- centred on mobile, aligned to
              the left of the content column on desktop. Previously this was two
              duplicated wrappers because the old design positioned them
              differently enough that they could not share an element.
              It sits in normal flow pulled up over the video rather than being
              absolutely positioned: the copy wraps much taller at a real phone
              width than at the width the mobile frame is drawn at, and an
              absolute box would overhang into the section below -- which is
              what the old max-[420px]:mt-[240px] on the themes section was
              compensating for. In flow, whatever follows simply starts beneath
              it. See heroPull/heroPullLg for where the offsets come from. */}
          <div className="relative -mt-heroPull xl:-mt-heroPullLg w-full xl:max-w-contentBox mx-auto px-1.5 z-20">
            <div className="w-full max-w-32.5 mx-auto xl:mx-0 flex flex-col gap-1.5 bg-background-white border-1 border-baseBlack rounded-lg px-2.5 py-3 xl:px-3.5 xl:py-4">
              <div className="body">Hi, welcome to Inclusive Reality Lab 👋</div>
              <div className="heading3">
                We envision a seamless world where the physical and virtual blur
                to dissolve all barriers - <br />a prosocial space where age, ability,
                and even species no longer limit how we connect and empower one
                another.
              </div>
            </div>
          </div>
        </div>



        <div className="relative z-0">
          {/* Three Themes Section, at the narrower 912 measure. */}
          <section className="flex flex-col gap-4 w-full xl:max-w-narrowBox mx-auto px-1.5 pt-8 pb-4">
            <p className="heading3 text-center">
              Our work is broken down into three categories
            </p>

            <div className="w-full flex flex-col xl:flex-row gap-2.5">
              {THEMES.map(({ title, description }) => (
                <div
                  key={title}
                  className="flex-1 flex flex-col gap-1 text-center"
                >
                  <p className="heading2">{title}</p>
                  <p className="body">{description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Projects Carousel */}
          <section className="relative">
            <Carousel
              projects={featuredProjects}
              isLoading={isProjectsLoading}
            />
          </section>

          {/* Mission Text, at the same 912 measure as the themes section */}
          <section className="heading3 w-full xl:max-w-narrowBox mx-auto px-1.5 py-4">
            We study how technology can understand human needs so it can assist and 
            augment our natural abilities. <br />
            <br />
            We’re bridging the gaps between what people want to do and 
            what their current environment or body allows them to do.<br />
            <br />
            By designing adaptive and empowering technologies, we aim to create
            a world where diverse individuals can thrive, connect, and reach
            their full potential.
          </section>

          {/* Featured Publications. No heading in the updated design -- the
              list follows the mission text directly, at the same 912 measure. */}
          <section className="flex flex-col gap-2.5 w-full xl:max-w-narrowBox mx-auto px-1.5 py-4">
            <PublicationContainer
              publications={featuredPublications}
              isLoading={isPubsLoading}
            />
            <ButtonText
              label="View All Publications"
              linkAddress="/publications"
              className="w-full max-w-17 self-center xl:self-end xl:max-w-none xl:w-15"
            />
          </section>



          {/* News. A bordered 800px panel centred in the column, holding a
              fixed-height scrolling list. */}
          <section className="w-full xl:max-w-narrowBox mx-auto px-1.5 py-4">
            <div className="flex flex-col gap-1.5 w-full xl:max-w-50 mx-auto border-1 border-baseBlack rounded-lg px-1 xl:px-2.5 py-3">
              <h2 className="heading4 text-center">Lab News</h2>
              <div className="custom-scrollbar flex flex-col gap-1.5 p-1 h-20 xl:h-12.5 overflow-y-auto">
                {isNewsLoading ? (
                  /* the panel is already a fixed height, so nothing can shift
                     here -- a centred spinner is enough */
                  <div className="flex grow items-center justify-center">
                    <LoadingSpinner />
                  </div>
                ) : news.length === 0 ? (
                  <p className="bodySmall">No news available at the moment.</p>
                ) : (
                  news.map((newsItem, index) => (
                    <NewsListItem news={newsItem} key={index} />
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
