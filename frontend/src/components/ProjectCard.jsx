import { useNavigate } from "react-router-dom";
import useSetProjectCover from "../hooks/useSetProjectCover";
import ProjectLabelsContainer from "./ProjectLabelsContainer";

// 440 tall: a 320px cover with a 120px white panel beneath it.
function ProjectCard({ project, className = "" }) {
  const navigate = useNavigate();
  const [projectCoverStyle] = useSetProjectCover(project);

  const handleCardClick = () => {
    navigate(`/projects/${project.ID}`, { state: { project: project } });
  };

  return (
    <div
      className={`${className} group flex flex-col h-27.5 rounded-2xl border-1 border-baseBlack bg-background-white overflow-hidden cursor-pointer`}
      onClick={handleCardClick}
    >
      {/* cover; hover lays a flat 20% black over it and nothing else */}
      <div
        className="relative h-20 w-full shrink-0"
        style={projectCoverStyle}
      >
        <div className="absolute inset-0 bg-baseBlack/0 group-hover:bg-baseBlack/20 transition ease-in duration-200" />
      </div>

      {/* white panel */}
      <div className="flex flex-col gap-1 p-1 grow">
        <ProjectLabelsContainer researchThemes={project["Research Theme"]} />
        <h2 className="heading4 line-clamp-2">{project["Project Name"]}</h2>
      </div>
    </div>
  );
}

export default ProjectCard;
