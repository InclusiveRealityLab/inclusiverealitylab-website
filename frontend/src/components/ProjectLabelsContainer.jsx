import InfoLabel from "./labels/InfoLabel";
function ProjectLabelsContainer({researchThemes}) {
  return (
    <>
      <div className="self-start flex flex-row flex-wrap gap-0.5 w-full">
        {(Array.isArray(researchThemes)
          ? researchThemes
          : [researchThemes]
        ).map((theme, index) => (
          <InfoLabel key={index} label={theme} />
        ))}
      </div>
    </>
  );
}

export default ProjectLabelsContainer;
