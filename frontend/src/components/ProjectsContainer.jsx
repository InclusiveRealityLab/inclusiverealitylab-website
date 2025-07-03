import ProjectCard from "./ProjectCard";
function ProjectsContainer({ projects }) {
  return (
    <>
      <div className="grid gap-1.5 w-full grid-cols-[repeat(auto-fit,minmax(256px,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}

export default ProjectsContainer;