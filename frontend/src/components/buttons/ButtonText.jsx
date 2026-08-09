import { Link } from "react-router";

// Transparent by default, green wash on hover -- the same treatment as a nav
// tab, at button width. 144 is the component's own size; callers stretch it
// (the landing "View All Publications" sits at 240).
function ButtonText({ label, linkAddress, className = "" }) {
  return (
    <Link
      to={linkAddress}
      className={`label w-btnW h-control rounded-lg flex items-center justify-center text-center text-baseBlack hover:bg-background-secondary/40 transition ease-in duration-200 ${className}`}
    >
      {label}
    </Link>
  );
}

export default ButtonText;
