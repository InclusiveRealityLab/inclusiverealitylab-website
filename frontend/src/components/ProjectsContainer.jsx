import ProjectCard from "./ProjectCard";
import ProjectCardSkeleton from "./skeletons/ProjectCardSkeleton";

// How many placeholders to show while loading. Enough to fill the fold at both
// column counts without implying a real result count.
const SKELETON_COUNT = 4;

function ProjectsContainer({ projects, isLoading = false }) {
  return (
    <>
      {/* two 504px cards + a 24px gap fill the 1032 content column exactly.
          md is the real breakpoint token, replacing an ad-hoc min-[600px]. */}
      <div
        className="grid gap-1.5 w-full grid-cols-1 md:grid-cols-2"
        aria-busy={isLoading}
      >
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }, (_, i) => (
              <ProjectCardSkeleton key={i} />
            ))
          : projects.map((project) => (
              <ProjectCard key={project.ID} project={project} />
            ))}
      </div>
    </>
  );
}

export default ProjectsContainer;
