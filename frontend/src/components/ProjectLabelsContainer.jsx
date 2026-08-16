import InfoLabel from "./labels/InfoLabel";
import { themeOrder } from "../constants/infoTagStyles";

// A theme the sheet does not recognise keeps its place at the end rather than
// jumping to the front, which is what a -1 from indexOf would do.
const rank = (theme) => {
  const i = themeOrder.indexOf(String(theme ?? "").toLowerCase());
  return i === -1 ? themeOrder.length : i;
};

function ProjectLabelsContainer({ researchThemes }) {
  // filter() already copies, so sorting here cannot disturb the caller's array.
  const themes = (
    Array.isArray(researchThemes) ? researchThemes : [researchThemes]
  )
    .filter(Boolean)
    .sort((a, b) => rank(a) - rank(b));

  return (
    <div className="self-start flex flex-row flex-wrap gap-0.5 w-full">
      {themes.map((theme) => (
        <InfoLabel key={theme} label={theme} />
      ))}
    </div>
  );
}

export default ProjectLabelsContainer;
