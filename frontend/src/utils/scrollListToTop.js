// Changing a filter swaps the whole list underneath, so return to the top
// rather than leaving the reader stranded partway down a list they are no
// longer looking at.
export default function scrollListToTop() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
}
