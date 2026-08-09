import ProjectCard from "./ProjectCard";
function ProjectsContainer({ projects }) {
  return (
    <>
      {/* two 504px cards + a 24px gap fill the 1032 content column exactly */}
      <div className="grid gap-1.5 w-full grid-cols-1 min-[600px]:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}

export default ProjectsContainer;