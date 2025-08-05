import InfoLabel from "./labels/InfoLabel";
import projectImagePlaceholder from "../assets/images/projectImagePlaceholder.png";

function ProjectCard({ project, className = "" }) {
  // Use project image if available, otherwise use placeholder
  const backgroundImage = project?.image || projectImagePlaceholder;
  
  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div
      className={`${className} group flex flex-col justify-end  min-w-16 py-1 px-0.5 xl:px-1.5 gap-1 h-20`}
      style={backgroundStyle}
    >
      <h2 className="group-hover:text-text-active heading2 text-baseWhite line-clamp-2">
        {project["project name"] ??
          "Enhance human-food interaction in social settings"}
      </h2>
      <div className="self-start flex flex-row flex-wrap gap-0.5 w-full">
        {(Array.isArray(project["research theme"])
          ? project["research theme"]
          : [project["research theme"]]
        ).map((theme, index) => (
          <InfoLabel key={index} label={theme} />
        ))}
      </div>
    </div>
  );
}

export default ProjectCard;