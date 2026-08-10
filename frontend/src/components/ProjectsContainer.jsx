import ProjectCard from "./ProjectCard";
function ProjectsContainer({ projects }) {
  return (
    <>
      {/* two 504px cards + a 24px gap fill the 1032 content column exactly.
          md is the real breakpoint token, replacing an ad-hoc min-[600px]. */}
      <div className="grid gap-1.5 w-full grid-cols-1 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}

export default ProjectsContainer;