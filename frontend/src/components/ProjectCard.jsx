import { useNavigate } from "react-router-dom";
import useSetProjectCover from "../hooks/useSetProjectCover";
import ProjectLabelsContainer from "./ProjectLabelsContainer";

// The cover holds a 63:40 ratio (504/320 desktop, 400/254 mobile -- the design
// uses the same ratio at both) and the info panel is a fixed 120. So the card
// height follows from its width rather than being pinned, which keeps the cover
// from distorting as the card narrows.
function ProjectCard({ project, className = "" }) {
  const navigate = useNavigate();
  const [projectCoverStyle] = useSetProjectCover(project);

  const handleCardClick = () => {
    navigate(`/projects/${project.ID}`, { state: { project: project } });
  };

  // The panel is a fixed 120: 88 of content inside 16 of padding. One chip row
  // plus a 16 gap leaves 48, which is the two title lines the design asks for.
  //
  // A third theme wraps to a second chip row on a mobile-width card -- the
  // chips are 104 and only two fit across 288 -- and 56 of chips plus that same
  // gap would leave 16, half a line, so the title gets cut through the middle.
  // Tightening the gap to 8 there gives 56 + 8 + 24: exactly one whole line,
  // clamped to one so the ellipsis lands on it. Desktop cards are wide enough
  // to keep all three chips on one row, so they keep both.
  const themes = project["Research Theme"];
  const themeCount = Array.isArray(themes) ? themes.length : themes ? 1 : 0;
  const chipsWrap = themeCount >= 3;

  return (
    <div
      className={`${className} group flex flex-col rounded-lg border-1 border-baseBlack bg-background-white overflow-hidden cursor-pointer`}
      onClick={handleCardClick}
    >
      {/* cover; hover lays a flat 20% black over it and nothing else */}
      <div
        className="relative w-full aspect-[63/40] shrink-0"
        style={projectCoverStyle}
      >
        <div className="absolute inset-0 bg-baseBlack/0 group-hover:bg-baseBlack/20 transition ease-in duration-200" />
      </div>

      {/* white panel */}
      <div
        className={`flex flex-col p-1 h-7.5 shrink-0 ${
          chipsWrap ? "gap-0.5 xl:gap-1" : "gap-1"
        }`}
      >
        <ProjectLabelsContainer researchThemes={themes} />
        <h2
          className={`heading4 shrink-0 ${
            chipsWrap ? "line-clamp-1 xl:line-clamp-2" : "line-clamp-2"
          }`}
        >
          {project["Project Name"]}
        </h2>
      </div>
    </div>
  );
}

export default ProjectCard;
