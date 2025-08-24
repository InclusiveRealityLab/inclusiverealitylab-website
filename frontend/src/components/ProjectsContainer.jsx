import ProjectCard from "./ProjectCard";
function ProjectsContainer({ projects }) {
  return (
    <>
      <div className="grid gap-1.5 w-full grid-cols-1  min-[600px]:grid-cols-2 xl:grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}

export default ProjectsContainer;