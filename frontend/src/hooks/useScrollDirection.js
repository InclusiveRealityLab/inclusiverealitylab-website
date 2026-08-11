import { useState, useEffect, useRef } from "react";

// Reports which way the page is being scrolled. Deliberately unthresholded --
// callers decide how far down the page the answer starts mattering, which is
// what lets the landing page ignore it until past the key visual while the
// other pages react almost immediately.
function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState("up");
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY.current) {
        setScrollDirection("down");
      } else if (currentScrollY < prevScrollY.current) {
        setScrollDirection("up");
      }

      prevScrollY.current = currentScrollY;
    };

    // The previous position is a ref rather than state on purpose: as state it
    // re-ran this effect on every scroll event, tearing down and re-adding the
    // listener each time and re-seeding the previous position from the current
    // one -- which swallowed the very deltas it was trying to measure.
    window.addEventListener("scroll", handleScroll, { passive: true });
    prevScrollY.current = window.scrollY;

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollDirection;
}

export default useScrollDirection;
