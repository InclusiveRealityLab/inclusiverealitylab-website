import { use } from "react";
import useSetProjectCover from "../hooks/useSetProjectCover";
import { useLocation } from "react-router";

function ProjectDetailsPage( ) {
 
  const location = useLocation();
  const {state} = location;
  const {project } = state;
   const [projectBackgroundStyle] = useSetProjectCover(project);
  return (
    <>
      {project && (
        <div className="mt-4 w-screen bg-background-white ">
          <div className=" px-1.5 xl:px-0 flex flex-col justify-between items-start  py-5 gap-4 w-full xl:max-w-[1032px]  ">
            <div className="xl:w-screen xl:h-50 h-[560px] z-15 " style = {projectBackgroundStyle}>
              
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectDetailsPage;
