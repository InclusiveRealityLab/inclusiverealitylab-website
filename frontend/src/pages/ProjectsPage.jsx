import ProjectCard from "../components/ProjectCard";
import projects from "../sampleData/projects";
import ProjectsContainer from "../components/ProjectsContainer";
import PublicationSectionWrapper from "../components/wrappers/PublicationSectionWrapper";
import { useState, useEffect } from "react";

import axios from "axios";
import extractData from "../utils/extractData";
import LoadingSpinner from "../components/LoadingSpinner";


function ProjectsPage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [currentProjects, setCurrentProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pastProjects, setPastProjects] = useState([]);

  useEffect(() => {
    async function loadCurrentProjects() {
      try {
        const res = await axios.get(API_BASE_URL, {
          params: { entity: "projects", resource: "current" },
        });
        setCurrentProjects(extractData(res.data));
      } catch (error) {
        console.error("Error fetching current projects:", error);
        setCurrentProjects([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadCurrentProjects();
  }, []);

  useEffect(() => {
    async function loadPastProjects() {
      try {
        const res = await axios.get(API_BASE_URL, {
          params: { entity: "projects", resource: "past" },
        });
        setPastProjects(extractData(res.data));
      } catch (error) {
        console.error("Error fetching past projects:", error);
        setPastProjects([]);
      } finally {
        setIsLoading(false);
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
              <LoadingSpinner/>
            </div>
          ) : (
            <>
              <button className="heading4 mt-1">Current Projects</button>
              <ProjectsContainer projects={currentProjects} />
              <button className="heading4 mt-1">Past Projects</button>
              <ProjectsContainer projects={pastProjects} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ProjectsPage;
