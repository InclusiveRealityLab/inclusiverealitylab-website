import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import ProjectCard from "../components/ProjectCard";
import ButtonText from "./buttons/ButtonText";

import validRightArrow from "../assets/icons/validRightArrow.svg";
import validLeftArrow from "../assets/icons/validLeftArrow.svg";

// Card + gap, which is how far one step moves the track.
// Desktop 504 + 32 (the design's 3184 track = 6 * 504 + 5 * 32), mobile 272 + 24.
const STEP_DESKTOP = 536;
const STEP_MOBILE = 296;

function Carousel({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState(STEP_DESKTOP);
  const [maxOffset, setMaxOffset] = useState(0);
  const [fitsOnScreen, setFitsOnScreen] = useState(false);

  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const measure = () => {
      setStep(window.innerWidth >= 1280 ? STEP_DESKTOP : STEP_MOBILE);
      const viewport = viewportRef.current?.clientWidth ?? 0;
      const track = trackRef.current?.scrollWidth ?? 0;
      // How far the track can travel before its right edge meets the
      // container's -- scrolling past this would leave dead space.
      setMaxOffset(Math.max(0, track - viewport));
      // Compared against the screen, not the container: the container is
      // capped at 1032, so it never grows with the display. clientWidth
      // excludes the scrollbar, unlike innerWidth.
      const screen = document.documentElement.clientWidth;
      setFitsOnScreen(track > 0 && track <= screen);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [projects.length]);

  // Last useful step: beyond it the track would only reveal empty space.
  const maxIndex = step > 0 ? Math.ceil(maxOffset / step) : 0;

  // When the whole track fits the screen there is nothing to page through, so
  // it is centred instead. The container is itself centred and the track is
  // allowed to bleed past it, so splitting the overflow evenly centres the
  // track on screen.
  const offset = fitsOnScreen
    ? maxOffset / 2
    : Math.min(currentIndex * step, maxOffset);

  const canScroll = maxOffset > 0 && !fitsOnScreen;

  // Wraps in both directions, so neither arrow is ever a dead end.
  const handleMoveRight = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleMoveLeft = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    // Container is the 1032 content column; the track sits flush to its left
    // and right edges and bleeds past them rather than being inset.
    <div className="flex flex-col justify-start gap-4 py-5 w-full xl:max-w-content mx-auto px-1.5 xl:px-0">
      <div
        ref={viewportRef}
        className="relative overflow-x-scroll xl:overflow-visible"
      >
        <motion.div
          ref={trackRef}
          className="flex gap-1.5 xl:gap-2"
          initial={{ x: 0 }}
          animate={{ x: -offset }}
          transition={{ type: "tween", duration: 0.6 }}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              className="w-17 xl:w-31.5 shrink-0"
            />
          ))}
        </motion.div>
      </div>

      {/* controls: arrows left, view-all right */}
      <div className="flex flex-row justify-between items-center gap-1.5 w-full">
        {canScroll && (
          <div className="hidden xl:flex flex-row justify-start items-center gap-1.5">
            <button onClick={handleMoveLeft} className="label cursor-pointer">
              <img
                src={validLeftArrow}
                alt="Left arrow"
                className="w-control h-control"
              />
            </button>

            <button onClick={handleMoveRight} className="label cursor-pointer">
              <img
                src={validRightArrow}
                alt="Right arrow"
                className="w-control h-control"
              />
            </button>
          </div>
        )}

        {/* ml-auto keeps this right-aligned once the arrows are gone */}
        <ButtonText
          label="View All Projects"
          linkAddress="/projects"
          className="w-full max-w-17 mx-auto xl:mx-0 xl:ml-auto xl:w-15"
        />
      </div>
    </div>
  );
}

export default Carousel;
