import { use } from "react";
import useSetProjectCover from "../hooks/useSetProjectCover";
import { useLocation } from "react-router";
import { formatDate } from "../utils/formatDate";
import extractYear from "../utils/extractYear";
import LabelContainer from "../components/ProjectLabelsContainer";
import ProjectLabelsContainer from "../components/ProjectLabelsContainer";
import InfoLabel from "../components/labels/InfoLabel";
import extractDataFromProjectInfo from "../utils/extractDataFromProjectInfo";

function ProjectDetailsPage() {
  const location = useLocation();
  const { state } = location;
  const { project } = state;
  const [projectBackgroundStyle] = useSetProjectCover(project);

  const {intro, videoTag} = extractDataFromProjectInfo(project["Intro"]);
  console.log(videoTag);
  

  return (
    <>
      {project && (
        <div className="mt-4 w-screen bg-background-white ">
          <div className=" px-1.5 xl:px-0 flex flex-col justify-between  py-5 gap-4 w-full xl:max-w-[1032px] mx-auto ">
            <div
              className="xl:w-screen xl:h-50 h-[560px] z-15 self-center"
              style={projectBackgroundStyle}
            ></div>
            {/* {project details header} */}
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
            {/* authors section */}
            <div className="flex xl:flex-col gap-1 "><p className="heading4">People</p>
             <p className="body">{project["Member Name"].join(", ")}</p>
            </div>
            {/* intro section */}
            <div className="flex xl:flex-col gap-1 "><p className="heading4">About this project</p>
            <p className="body">{intro}</p>
            </div>
            {/* video section */}
            {videoTag && (
              <div className="w-full flex">
                <div
                  className="w-full "
                  dangerouslySetInnerHTML={{ __html: videoTag }}
                />
              </div>
            )}
        

            {/* related publications section */}
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectDetailsPage;
