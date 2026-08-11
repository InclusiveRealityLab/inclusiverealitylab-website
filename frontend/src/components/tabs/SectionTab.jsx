// 32 tall, 88 wide at minimum, growing with the label -- "Lab members" and
// "Collaborators" run past 88, while "Current" / "Past" / a year do not, so the
// short labels still sit at exactly 88.
//
// Hover previews the selected fill -- the same 40% brand green the theme chips
// and button hovers use -- but only the selected state carries the stroke, so
// the current choice stays distinguishable while hovering another.
//
// The unselected border is transparent rather than absent, which keeps the text
// from shifting a pixel as the border appears.
function SectionTab({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`caption shrink-0 min-w-5.5 h-2 px-0.5 rounded-sm border-1 cursor-pointer transition ease-in duration-200 hover:bg-background-secondary/40 ${
        selected
          ? "bg-background-secondary/40 border-baseBlack"
          : "bg-transparent border-transparent"
      }`}
    >
      {label}
    </button>
  );
}

export default SectionTab;
