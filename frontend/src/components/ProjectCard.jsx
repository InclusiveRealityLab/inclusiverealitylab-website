import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoLabel from "./labels/InfoLabel";
import projectImagePlaceholder from "../assets/images/projectImagePlaceholder.png";
import useSetProjectCover from "../hooks/useSetProjectCover";
import ProjectLabelsContainer from "./ProjectLabelsContainer";

function ProjectCard({ project, className = "" }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/projects/${project.ID}`, { state: { project: project } });
  };

  const [projectBackgroundStyle] = useSetProjectCover(project);

  return (
    <div
      className={`${className} group flex flex-col justify-end min-w-[267px] py-1 px-1 xl:px-1.5 gap-1 h-20`}
      style={projectBackgroundStyle}
      onClick={handleCardClick}
    >
      <div className=" flex overflow-hidden  w-full h-full">
        <h2 className="group-hover:text-text-active heading3 self-end overflow-ellipsis hyphens-auto text-baseWhite ">
          {project["Project Name"] ??
            "Enhance human-food interaction in social settings"}
        </h2>
      </div>
      <ProjectLabelsContainer researchThemes={project["Research Theme"]} />
    </div>
  );
}

export default ProjectCard;
