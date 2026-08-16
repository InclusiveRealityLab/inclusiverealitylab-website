import linkedin from "../assets/icons/linkedin.svg";
import facebook from "../assets/icons/fb.svg";
import youtube from "../assets/icons/youtube.svg";
import x from "../assets/icons/x.svg";

// The icons ship at 40x40 and the design now lays them out at that size with
// 16px gaps: 4 * 40 + 3 * 16 = 208, the width of the social row. The row is 48
// tall, so centring leaves the design's 4px above and below.
const HANDLES = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/inclusiverealitylab",
    icon: linkedin,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/inclusiverealitylab",
    icon: facebook,
  },
  {
    name: "Youtube",
    href: "https://www.youtube.com/@InclusiveRealityLab",
    icon: youtube,
  },
  { name: "X", href: "https://x.com/irl_uoa", icon: x },
];

function SocialMediaHandleContainer({ className = "" }) {
  return (
    <div
      className={`flex flex-row items-center gap-1 w-13 h-3 ${className}`}
    >
      {HANDLES.map(({ name, href, icon }) => (
        <a key={name} href={href} target="_blank" rel="noopener noreferrer">
          <img src={icon} alt={`${name} handle icon`} className="w-2.5 h-2.5" />
        </a>
      ))}
    </div>
  );
}

export default SocialMediaHandleContainer;
