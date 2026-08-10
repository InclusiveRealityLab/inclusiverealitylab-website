import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import useScrollBeyondVisual from "./useScrollBeyondVisual";
import useScrollDirection from "./useScrollDirection";

// The navbar retracts when scrolling down past the hero. Anything that pins
// itself beneath the navbar needs the same answer, so the rule lives here
// rather than being restated at each call site and drifting.
function useNavbarHidden() {
  const location = useLocation();

  // The landing page hides it only past the key visual; other pages are short
  // on chrome, so almost immediately.
  const threshold = useMemo(
    () => (location.pathname === "/" ? 800 : 10),
    [location.pathname]
  );

  const isScrolledBeyondVisual = useScrollBeyondVisual(threshold);
  const scrollDirection = useScrollDirection();

  return scrollDirection === "down" && isScrolledBeyondVisual;
}

export default useNavbarHidden;
