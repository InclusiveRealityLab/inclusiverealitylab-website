function ProjectCard({ project, className = "" }) {
  return (
    <div
      className={`${className} flex flex-col justify-end items-end xl:max-w-36.5 xl:min-w-25 max-w-25 min-w-16  py-1 px-0.5 gap-1 h-20 bg-[url(/projectPhoto.png)] bg-cover`}
    >
      <h2 className="heading2 text-baseWhite line-clamp-2">
        {project?.title ?? "Enhance human-food interaction in social settings "}
      </h2>
    </div>
  );
}

export default ProjectCard;
