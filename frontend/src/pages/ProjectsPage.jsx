import ProjectCard from "../components/ProjectCard";
import projects from "../sampleData/projects";
import ProjectsContainer from "../components/ProjectsContainer";
import PublicationSectionWrapper from "../components/wrappers/PublicationSectionWrapper";
import { useState, useEffect } from "react";
import loading from "../assets/icons/loading.svg";
import axios from "axios";
import API_BASE_URL from "../sampleData/constants";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const reponse = await axios.get(`${API_BASE_URL}/projects`);
        const data = await reponse.data;
        setProjects(data);
        console.log(data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching projects items", error);
      }
    }
    loadProjects();
  }, []);

  return (
    <>
      <div className="mt-4 w-screen bg-background-white">
        <div className=" px-1.5 xl:px-0 flex flex-col justify-between items-start  py-5 gap-4 w-full xl:max-w-[1032px]  xl:mx-auto">
          <h1 className="heading1 self-start">Projects</h1>

          <button className="heading4 mt-1">Current Projects</button>
          {isLoading ? (
            <div className="flex min-h-screen w-full items-center justify-center">
              <img src={loading} className="w-12 h-12" />
            </div>
          ) : (
            <ProjectsContainer
              projects={projects.filter(
                (project) =>
                  project["end date"] === "" && project["type"] !== "Internal"
              )}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ProjectsPage;
