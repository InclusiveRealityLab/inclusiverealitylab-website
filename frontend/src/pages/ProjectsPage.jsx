import { useState, useEffect } from "react";
import axios from "axios";

import ProjectsContainer from "../components/ProjectsContainer";
import PageTitleSection from "../components/PageTitleSection";
import WorkFilter from "../components/filters/WorkFilter";
import extractData from "../utils/extractData";
import LoadingSpinner from "../components/LoadingSpinner";
import scrollListToTop from "../utils/scrollListToTop";

const FILTERS = ["Current", "Past"];

function ProjectsPage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [currentProjects, setCurrentProjects] = useState([]);
  const [pastProjects, setPastProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState(FILTERS[0]);

  useEffect(() => {
    async function loadProjects() {
      try {
        const [current, past] = await Promise.all([
          axios.get(API_BASE_URL, {
            params: { entity: "projects", resource: "current" },
          }),
          axios.get(API_BASE_URL, {
            params: { entity: "projects", resource: "past" },
          }),
        ]);
        setCurrentProjects(extractData(current.data));
        setPastProjects(extractData(past.data));
      } catch (error) {
        console.error("Error fetching projects:", error);
        setCurrentProjects([]);
        setPastProjects([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadProjects();
  }, []);

  const handleFilterChange = (next) => {
    setFilter(next);
    scrollListToTop();
  };

  const shown = filter === "Current" ? currentProjects : pastProjects;

  return (
    <div className="w-screen">
      <PageTitleSection title="Projects">
        <WorkFilter
          options={FILTERS}
          value={filter}
          onChange={handleFilterChange}
          label="Filter projects"
        />
      </PageTitleSection>

      <div className="pageShell items-start xl:mx-auto">
        {isLoading ? (
          <div className="flex min-h-screen w-full items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : shown.length === 0 ? (
          <p className="body">No {filter.toLowerCase()} projects to show.</p>
        ) : (
          <ProjectsContainer projects={shown} />
        )}
      </div>
    </div>
  );
}

export default ProjectsPage;
