import linkedin from "../assets/icons/linkedin.svg";
import facebook from "../assets/icons/fb.svg";
import youtube from "../assets/icons/youtube.svg";
import x from "../assets/icons/x.svg";

// The icons ship at 40x40 but the design lays them out at 32 with 24px gaps:
// 4 * 32 + 3 * 24 = 200, the width of the social row.
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
      className={`flex flex-row items-center gap-1.5 w-12.5 h-3 ${className}`}
    >
      {HANDLES.map(({ name, href, icon }) => (
        <a key={name} href={href} target="_blank" rel="noopener noreferrer">
          <img src={icon} alt={`${name} handle icon`} className="w-2 h-2" />
        </a>
      ))}
    </div>
  );
}

export default SocialMediaHandleContainer;
