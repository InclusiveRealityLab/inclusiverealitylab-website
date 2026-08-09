import { infoTagStyles } from "../../constants/infoTagStyles";

function InfoLabel({ label }) {
  // Themes come from the sheet, so an unexpected value falls back to an
  // unfilled chip rather than rendering "undefined" into the class list.
  const tone = infoTagStyles[label?.toLowerCase()] ?? "";

  return (
    <div
      className={`caption flex items-center justify-center w-6.5 h-1.5 rounded-sm border-1 border-baseBlack text-baseBlack ${tone}`}
    >
      {label}
    </div>
  );
}

export default InfoLabel;
