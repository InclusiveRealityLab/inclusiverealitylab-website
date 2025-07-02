import InfoLabel from "./labels/InfoLabel";

function ProjectCard({ project, className = "" }) {
  return (
    <div
      className={`${className} flex flex-col justify-end items-end w-full py-1 px-0.5 gap-1 h-20 bg-[url(/projectPhoto.png)] bg-cover`}
    >
      <h2 className="heading2 text-baseWhite line-clamp-2">
        {project?.title ?? "Enhance human-food interaction in social settings "}
      </h2>
      <div className="self-start flex flex-row flex-wrap gap-0.5 w-full"><InfoLabel label="Understand"/><InfoLabel label="Augment"/><InfoLabel label="Assist"/></div>
    </div>
  );
}

export default ProjectCard;
