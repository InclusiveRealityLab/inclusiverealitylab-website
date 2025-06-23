import { useState, useEffect, use } from "react";
import useScrollBeyondVisual from "./useScrollBeyondVisual";

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [prevScrollY, setPrevScrollY] = useState(0);

  // This has been included to ensure the navbar is only hidden after the user has scrolled beyond the visual and not before that
  const isScrolledBeyond = useScrollBeyondVisual(800);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (isScrolledBeyond) {
        if (currentScrollY > prevScrollY) {
          setScrollDirection("down");
        } else if (currentScrollY < prevScrollY) {
          setScrollDirection("up");
        }
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  return scrollDirection;
}

export default useScrollDirection;
