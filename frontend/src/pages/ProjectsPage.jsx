import ProjectCard from "../components/ProjectCard";
import projects from "../sampleData/projects";
import ProjectsContainer from "../components/ProjectsContainer";
import PublicationSectionWrapper from "../components/wrappers/PublicationSectionWrapper";
import { useState, useEffect } from "react";
import loading from "../assets/icons/loading.svg";
import axios from "axios";
import API_BASE_URL from "../sampleData/constants";

function ProjectsPage() {
  const [currentProjects, setCurrentProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pastProjects,setPastProjects] = useState([]);

  useEffect(() => {
    async function loadCurrentProjects() {
      try {
        const reponse = await axios.get(`${API_BASE_URL}/projects/current`);
        const data = await reponse.data;
        setCurrentProjects(data);
        console.log(data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching current projects items", error);
      }
    }
    loadCurrentProjects();
  }, []);

  useEffect(() => {
    async function loadPastProjects() {
      try {
        const reponse = await axios.get(`${API_BASE_URL}/projects/past`);
        const data = await reponse.data;
        setPastProjects(data);
        console.log(data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching past projects items", error);
      }
    }
    loadPastProjects();
  }, []);

  return (
    <>
      <div className="mt-4 w-screen bg-background-white">
        <div className=" px-1.5 xl:px-0 flex flex-col justify-between items-start  py-5 gap-4 w-full xl:max-w-[1032px]  xl:mx-auto">
          <h1 className="heading1 self-start">Projects</h1>

          
          {isLoading ? (
            <div className="flex min-h-screen w-full items-center justify-center">
              <img src={loading} className="w-6 h-6" />
            </div>
          ) : (
            <>
              <button className="heading4 mt-1">Current Projects</button>
              <ProjectsContainer
                projects={currentProjects}
              />
              <button className="heading4 mt-1">Past Projects</button>
              <ProjectsContainer
                projects={pastProjects}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ProjectsPage;
