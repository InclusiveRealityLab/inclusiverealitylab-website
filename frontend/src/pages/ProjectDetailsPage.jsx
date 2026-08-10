import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

import useSetProjectCover from "../hooks/useSetProjectCover";
import ProjectLabelsContainer from "../components/ProjectLabelsContainer";
import PublicationsContainer from "../components/PublicationsContainer";
import LoadingSpinner from "../components/LoadingSpinner";
import extractYear from "../utils/extractYear";
import extractData from "../utils/extractData";
import extractSourceFromEmbedVideo from "../utils/extractSourceFromEmbedVideo";

function ProjectDetailsPage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams();
  const location = useLocation();

  // Arriving from a card carries the project in router state. A refresh or a
  // shared link does not, so fall back to fetching it by the :id in the URL --
  // without this the page threw on any direct visit.
  const [project, setProject] = useState(location.state?.project ?? null);
  const [isLoadingProject, setIsLoadingProject] = useState(
    !location.state?.project
  );
  const [notFound, setNotFound] = useState(false);

  const [relatedPublications, setRelatedPublications] = useState([]);
  const [isLoadingPublications, setIsLoadingPublications] = useState(false);

  useEffect(() => {
    if (project) return;

    async function loadProject() {
      try {
        // No by-id endpoint exists, but both lists together are ~10KB.
        const [current, past] = await Promise.all([
          axios.get(API_BASE_URL, {
            params: { entity: "projects", resource: "current" },
          }),
          axios.get(API_BASE_URL, {
            params: { entity: "projects", resource: "past" },
          }),
        ]);
        const all = [...extractData(current.data), ...extractData(past.data)];
        const match = all.find((p) => String(p.ID) === String(id));
        if (match) setProject(match);
        else setNotFound(true);
      } catch (error) {
        console.error("Error fetching project:", error);
        setNotFound(true);
      } finally {
        setIsLoadingProject(false);
      }
    }
    loadProject();
  }, [id, project, API_BASE_URL]);

  useEffect(() => {
    const publicationIds = project?.["Publication ID"];
    if (!publicationIds || publicationIds.length === 0) return;

    async function loadRelatedPublications() {
      setIsLoadingPublications(true);
      try {
        const res = await axios.get(API_BASE_URL, {
          params: {
            entity: "publications",
            resource: "multiplePublicationsID",
            pubList: publicationIds,
          },
        });
        setRelatedPublications(extractData(res.data));
      } catch (error) {
        console.error("Error fetching related publications:", error);
        setRelatedPublications([]);
      } finally {
        setIsLoadingPublications(false);
      }
    }
    loadRelatedPublications();
  }, [project, API_BASE_URL]);

  const [projectCoverStyle] = useSetProjectCover(project ?? {});

  if (isLoadingProject) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="pageShell items-start mx-auto xl:max-w-60 min-h-screen">
        <h1 className="heading2">Project not found</h1>
        <p className="body">
          This project may have been removed, or the link may be incorrect.
        </p>
      </div>
    );
  }

  const videoSrc = extractSourceFromEmbedVideo(project["Embed Video"]);
  const members = project["Member Name"];
  const memberNames = Array.isArray(members) ? members.join(", ") : members;

  return (
    <div className="w-screen">
      {/* cover sits in the content column at 9:5, below the fixed navbar */}
      {project["Cover"] && (
        <div className="w-full xl:max-w-contentBox mx-auto px-1.5 pt-4.5 xl:pt-6">
          <div className="w-full aspect-[9/5]" style={projectCoverStyle} />
        </div>
      )}

      <div className="pageShell items-start mx-auto xl:max-w-60">
        <div className="flex flex-col gap-1 w-full">
          <p className="body">
            {extractYear(project["Start Date"])} -{" "}
            {project["End Date"] ? extractYear(project["End Date"]) : "Present"}
          </p>
          <h1 className="heading2">{project["Project Name"]}</h1>
          <ProjectLabelsContainer
            researchThemes={project["Research Theme"]}
          />
        </div>

        {memberNames && (
          <section className="flex flex-col gap-2 w-full">
            <h2 className="heading4">People</h2>
            <p className="body">{memberNames}</p>
          </section>
        )}

        {project["Intro"] && (
          <section className="flex flex-col gap-2 w-full">
            <h2 className="heading4">About this project</h2>
            <p className="body whitespace-pre-line">{project["Intro"]}</p>
          </section>
        )}

        {videoSrc && (
          <section className="w-full aspect-video">
            <iframe
              className="w-full h-full"
              src={videoSrc}
              title={`${project["Project Name"]} video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </section>
        )}

        {(isLoadingPublications || relatedPublications.length > 0) && (
          <section className="flex flex-col gap-2 w-full">
            <h2 className="heading4">Publications</h2>
            {isLoadingPublications ? (
              <div className="flex items-center justify-center w-full">
                <LoadingSpinner />
              </div>
            ) : (
              <PublicationsContainer publications={relatedPublications} />
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default ProjectDetailsPage;
