import { useEffect, useState } from "react";
import InfoLabel from "./labels/InfoLabel";
import projectImagePlaceholder from "../assets/images/projectImagePlaceholder.png";

function ProjectCard({ project, className = "" }) {
  const [bgImage, setBgImage] = useState(projectImagePlaceholder);

  useEffect(() => {
    if (project["Cover"]) {
      const img = new window.Image();
      img.src = `/images/works/${project["Cover"]}`;
      img.onload = () => setBgImage(img.src);
      img.onerror = () => setBgImage(projectImagePlaceholder);
    } else {
      setBgImage(projectImagePlaceholder);
    }
  }, [project["Cover"]]);

  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div
      className={`${className} group flex flex-col justify-end min-w-16 py-1 px-0.5 xl:px-1.5 gap-1 h-20`}
      style={backgroundStyle}
    >
      <h2 className="group-hover:text-text-active heading2 text-baseWhite ">
        {project["Project Name"] ??
          "Enhance human-food interaction in social settings"}
      </h2>
      <div className="self-start flex flex-row flex-wrap gap-0.5 w-full">
        {(Array.isArray(project["Research Theme"])
          ? project["Research Theme"]
          : [project["Research Theme"]]
        ).map((theme, index) => (
          <InfoLabel key={index} label={theme} />
        ))}
      </div>
    </div>
  );
}

export default ProjectCard;