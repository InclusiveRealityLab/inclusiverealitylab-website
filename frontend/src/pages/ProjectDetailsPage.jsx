import { use } from "react";
import useSetProjectCover from "../hooks/useSetProjectCover";
import { useLocation } from "react-router";
import { formatDate } from "../utils/formatDate";
import extractYear from "../utils/extractYear";
import LabelContainer from "../components/ProjectLabelsContainer";
import ProjectLabelsContainer from "../components/ProjectLabelsContainer";
import InfoLabel from "../components/labels/InfoLabel";

function ProjectDetailsPage() {
  const location = useLocation();
  const { state } = location;
  const { project } = state;
  const [projectBackgroundStyle] = useSetProjectCover(project);
  return (
    <>
      {project && (
        <div className="mt-4 w-screen bg-background-white ">
          <div className=" px-1.5 xl:px-0 flex flex-col justify-between  py-5 gap-4 w-full xl:max-w-[1032px] mx-auto ">
            <div
              className="xl:w-screen xl:h-50 h-[560px] z-15 self-center"
              style={projectBackgroundStyle}
            ></div>
            <div className="flex flex-col gap-1 w-full">
              <p className="body w-full">
                {extractYear(project["Start Date"])} -{" "}
                <span>
                  {" "}
                  {project["End Date"]
                    ? extractYear(project["End Date"])
                    : "Present"}
                </span>{" "}
              </p>
              <p className="heading1">{project["Project Name"]}</p>

              <ProjectLabelsContainer
                researchThemes={project["Research Theme"]}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectDetailsPage;
