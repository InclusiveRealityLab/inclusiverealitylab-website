import { useEffect, useRef, useState } from "react";

import ProjectCard from "../components/ProjectCard";
import ProjectCardSkeleton from "./skeletons/ProjectCardSkeleton";
import ButtonText from "./buttons/ButtonText";

import leftArrow from "../assets/icons/left.svg";
import rightArrow from "../assets/icons/right.svg";

// Card + gap, which is how far one arrow press moves the track.
// Desktop 504 + 32 (the design's 3184 track = 6 * 504 + 5 * 32), mobile 320 + 24.
const STEP_DESKTOP = 536;
const STEP_MOBILE = 344;

// Enough to overflow the track at desktop width, so the placeholder row reads
// as a carousel rather than a short list.
const SKELETON_COUNT = 3;

function Carousel({ projects = [], isLoading = false }) {
  const viewportRef = useRef(null);
  const [step, setStep] = useState(STEP_DESKTOP);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const measure = () => {
      setStep(window.innerWidth >= 1024 ? STEP_DESKTOP : STEP_MOBILE);
      // A pixel of tolerance: sub-pixel layout can leave a fraction of
      // overflow that is not actually scrollable.
      setCanScroll(viewport.scrollWidth - viewport.clientWidth > 1);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [projects.length, isLoading]);

  // The track is a real scroll container rather than a transform, so a
  // trackpad swipe, a touch drag and the arrows all drive the same thing.
  const scrollByStep = (direction) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const max = viewport.scrollWidth - viewport.clientWidth;
    const atStart = viewport.scrollLeft <= 1;
    const atEnd = viewport.scrollLeft >= max - 1;

    // Wraps in both directions, so neither arrow is ever a dead end.
    let left;
    if (direction > 0) left = atEnd ? 0 : viewport.scrollLeft + step;
    else left = atStart ? max : viewport.scrollLeft - step;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    viewport.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className="flex flex-col gap-2.5 py-4 w-full">
      {/* Full-bleed scroll container. The horizontal padding is whatever puts
          the first card on the content column's left edge, so cards can run
          out to the screen edges instead of clipping at the column. max()
          keeps a 24px gutter once the viewport is narrower than the column. */}
      <div
        ref={viewportRef}
        className="flex gap-1.5 xl:gap-2 w-full overflow-x-auto px-1.5 xl:px-[max(24px,calc((100vw-1032px)/2))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }, (_, i) => (
              <ProjectCardSkeleton key={i} className="w-20 xl:w-31.5 shrink-0" />
            ))
          : projects.map((project) => (
              <ProjectCard
                key={project.ID}
                project={project}
                className="w-20 xl:w-31.5 shrink-0"
              />
            ))}
      </div>

      {/* controls: arrows left, view-all right */}
      <div className="flex flex-row justify-between items-center gap-1.5 w-full xl:max-w-contentBox mx-auto px-1.5 pl-4">
        {/* Arrows are for pointing devices; touch and trackpad scroll the
            track directly. Hidden entirely when nothing overflows, and while
            loading -- there is nothing to page through yet. */}
        {canScroll && !isLoading && (
          <div className="hidden pointer-fine:flex flex-row justify-start items-center gap-1.5">
            <button
              onClick={() => scrollByStep(-1)}
              className="label cursor-pointer"
              aria-label="Previous projects"
            >
              <img src={leftArrow} alt="" className="w-control h-control" />
            </button>

            <button
              onClick={() => scrollByStep(1)}
              className="label cursor-pointer"
              aria-label="Next projects"
            >
              <img
                src={rightArrow}
                alt=""
                className="w-control h-control"
              />
            </button>
          </div>
        )}

        {/* sits at the right edge of the container at every width */}
        <ButtonText
          label="View All Projects"
          linkAddress="/projects"
          className="w-full max-w-17 ml-auto xl:w-15"
        />
      </div>
    </div>
  );
}

export default Carousel;
