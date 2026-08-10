import useNavbarHidden from "../hooks/useNavbarHidden";

// Heading plus filter, pinned to the top so the filter stays reachable while
// the list scrolls.
//
// It sticks at top: 0 with a spacer standing in for the navbar, rather than
// sticking at the navbar's height -- that way the white background covers the
// navbar strip too, so list content never shows through it. When the navbar
// retracts on scroll-down the whole block slides up by that same amount and
// the heading rises to the top of the screen.
//
// The slide is a transform, not a height change. Collapsing the spacer instead
// would shorten the document, which nudges scrollY, which flips the scroll
// direction, which re-expands the spacer -- an oscillation. Transforms do not
// affect layout, so there is no feedback.
function PageTitleSection({ title, children }) {
  const navHidden = useNavbarHidden();

  return (
    <div
      className={`sticky top-0 z-20 w-full bg-background-white transition-transform duration-200 ease-in ${
        navHidden ? "-translate-y-4.5 xl:-translate-y-6" : ""
      }`}
    >
      {/* stands in for the navbar overhead */}
      <div className="h-4.5 xl:h-6" />
      <div className="flex flex-col gap-2.5 w-full xl:max-w-contentBox mx-auto px-1.5 pt-3.5 xl:pt-4 pb-1.5">
        <h1 className="heading2">{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default PageTitleSection;
