import { useNavigate } from "react-router-dom";
import useSetProjectCover from "../hooks/useSetProjectCover";
import ProjectLabelsContainer from "./ProjectLabelsContainer";

// The cover holds a 63:40 ratio (504/320 desktop, 400/254 mobile -- the design
// uses the same ratio at both) and the info panel is a fixed 120. So the card
// height follows from its width rather than being pinned, which keeps the cover
// from distorting as the card narrows.
function ProjectCard({ project, className = "" }) {
  const navigate = useNavigate();
  const [projectCoverStyle] = useSetProjectCover(project);

  const handleCardClick = () => {
    navigate(`/projects/${project.ID}`, { state: { project: project } });
  };

  return (
    <div
      className={`${className} group flex flex-col rounded-lg border-1 border-baseBlack bg-background-white overflow-hidden cursor-pointer`}
      onClick={handleCardClick}
    >
      {/* cover; hover lays a flat 20% black over it and nothing else */}
      <div
        className="relative w-full aspect-[63/40] shrink-0"
        style={projectCoverStyle}
      >
        <div className="absolute inset-0 bg-baseBlack/0 group-hover:bg-baseBlack/20 transition ease-in duration-200" />
      </div>

      {/* white panel */}
      <div className="flex flex-col gap-1 p-1 h-7.5 shrink-0">
        <ProjectLabelsContainer researchThemes={project["Research Theme"]} />
        <h2 className="heading4 line-clamp-2">{project["Project Name"]}</h2>
      </div>
    </div>
  );
}

export default ProjectCard;
