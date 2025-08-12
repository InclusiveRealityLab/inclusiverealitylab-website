import fb_blk from "../assets/icons/fb_blk.svg";
import fb_wht from "../assets/icons/fb_wht.svg";
import x_wht from "../assets/icons/x_wht.svg";
import linkedin_wht from "../assets/icons/linkedin_wht.svg";
import youtube_wht from "../assets/icons/youtube_wht.svg";
import x_blk from "../assets/icons/x_blk.svg"
import linkedin_blk from "../assets/icons/linkedin_blk.svg";
import youtube_blk from "../assets/icons/youtube_blk.svg";



function SocialMediaHandleContainer({iconColor}) {
  return (
    <div className="flex flex-row gap-1 py-0.5 justify-between items-center w-[200px]">
      <a
        href="https://linkedin.com/company/inclusiverealitylab"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={iconColor === "wht" ? linkedin_wht : linkedin_blk} alt="LinkedIn handle icon" />
      </a>

      <a
        href="https://www.facebook.com/inclusiverealitylab"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={iconColor === "wht" ? fb_wht : fb_blk} alt="Facebook handle icon" />
      </a>

      <a
        href="https://www.youtube.com/@InclusiveRealityLab"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={iconColor === "wht" ? youtube_wht : youtube_blk} alt="Youtube handle icon" />
      </a>

      <a href="https://x.com/irl_uoa" target="_blank" rel="noopener noreferrer">
        <img src={iconColor === "wht" ? x_wht : x_blk} alt="X handle icon" />
      </a>
    </div>
  );
}

export default SocialMediaHandleContainer;
