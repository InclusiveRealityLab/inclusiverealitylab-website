import { use } from "react";
import useSetProjectCover from "../hooks/useSetProjectCover";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { formatDate } from "../utils/formatDate";
import extractYear from "../utils/extractYear";
import LabelContainer from "../components/ProjectLabelsContainer";
import ProjectLabelsContainer from "../components/ProjectLabelsContainer";
import InfoLabel from "../components/labels/InfoLabel";
import extractSourceFromEmbedVideo from "../utils/extractSourceFromEmbedVideo";
import extractData from "../utils/extractData";
import PublicationListItem from "../components/PublicationListItem";
import axios from "axios";
import PublicationsContainer from "../components/PublicationsContainer";

function ProjectDetailsPage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const location = useLocation();
  const { state } = location;
  const { project } = state;
  const [projectBackgroundStyle] = useSetProjectCover(project);

  const videoSrc = extractSourceFromEmbedVideo(project["Embed Video"]);

  const [isLoading, setIsLoading] = useState(true);
  const [relatedPublication, setRelatedPublication] = useState([]);

  useEffect(() => {
    // const titleToGet = project["Publication Title"]; // FOR SINGLE RELATED PUBLICATION
    const titlesToGet = project["Publication ID"]; // FOR MULTIPLE PUBLICATIONS
    console.log("Fetching related publication for title:", titleToGet);
    if (!titleToGet) {
      return;
    }

    if (titlesToGet.length ==0) {
      return;
    }
    async function loadRelatedPublications() {
      try {
        const res = await axios.get(API_BASE_URL, {
          params: {
            entity: "publications",
            // resource: "publicationByTitle", // for single
            resource: "multiplePublicationsID", // for multiple
            // publicationTitle: titleToGet, // for single
            pubList: titlesToGet, // for multiple
          },
        });
        setRelatedPublication(res.data.result);
        console.log("Related publication data:", res);
      } catch (error) {
        console.error("Error fetching related publication:", error);
        setRelatedPublication("");
      } finally {
        setIsLoading(false);
      }
    }
    loadRelatedPublications();
  }, []);

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
            <div className="flex xl:flex-col gap-1 ">
              <p className="heading4">People</p>
              <p className="body">{project["Member Name"].join(", ")}</p>
            </div>
            {/* intro section */}
            <div className="flex xl:flex-col gap-1 ">
              <p className="heading4">About this project</p>
              <p className="body">{project["Intro"]}</p>
            </div>
            {/* video section */}
            {videoSrc && (
              <div className="w-full xl:h-[580.5px] border-2 flex">
                <iframe
                  width="100%"
                  height="auto"
                  src={videoSrc}
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {/* related publications section */}
            <div className="flex xl:flex-col gap-1 ">
              <p className="heading4">Publications</p>
              {/* <PublicationListItem publication={} /> */}
              {/* {relatedPublication && (
                <PublicationListItem publication={relatedPublication} />
              )} */}
              <PublicationsContainer publications={relatedPublication} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectDetailsPage;
