import { useState, useEffect } from "react";
import axios from "axios";

import ProjectsContainer from "../components/ProjectsContainer";
import PageTitleSection from "../components/PageTitleSection";
import SectionTabs from "../components/tabs/SectionTabs";
import extractData from "../utils/extractData";
import scrollListToTop from "../utils/scrollListToTop";

const SECTIONS = ["Current", "Past"];

function ProjectsPage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [currentProjects, setCurrentProjects] = useState([]);
  const [pastProjects, setPastProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [section, setSection] = useState(SECTIONS[0]);

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

  const handleSectionChange = (next) => {
    setSection(next);
    scrollListToTop();
  };

  const shown = section === "Current" ? currentProjects : pastProjects;

  return (
    <div className="w-screen">
      <PageTitleSection title="Projects">
        <SectionTabs
          options={SECTIONS}
          value={section}
          onChange={handleSectionChange}
          label="Project groups"
        />
      </PageTitleSection>

      <div className="pageShell items-start xl:mx-auto xl:max-w-narrowBox">
        {!isLoading && shown.length === 0 ? (
          <p className="body">No {section.toLowerCase()} projects to show.</p>
        ) : (
          <ProjectsContainer projects={shown} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}

export default ProjectsPage;
