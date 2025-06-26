import { useEffect } from 'react';

// tailwind does not support complex calculations, hence this has been implemented to implement the centering logic for the 'our latest work 'section in the landing page for screens of width 1280 and above

const useCustomCentering = (ref) => {
  useEffect(() => {
    const applyPadding = () => {
      const w = window.innerWidth;
      if (!ref.current || w <= 1280 ) return;
      
      // this equation has been derived based on a quadratic relationship between the screen size and the margin required to accurately center the 'our latest work' section in the landing page
      const p = Math.max(0, Math.min(640, 0.00001416 * w * w + 0.442 * w - 585.09));
      ref.current.style.marginLeft = ref.current.style.marginRight = `${p}px`;
    };

    applyPadding();
    window.addEventListener('resize', applyPadding);
    return () => window.removeEventListener('resize', applyPadding);
  }, [ref]);
};


export default useCustomCentering;