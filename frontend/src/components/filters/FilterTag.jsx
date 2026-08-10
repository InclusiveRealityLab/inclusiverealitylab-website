// 88x32 tag. Hover previews the selected fill -- the same 40% brand green the
// theme chips and button hovers use -- but only the selected state carries the
// stroke, so the current choice stays distinguishable while hovering another.
//
// The unselected border is transparent rather than absent: the tag is a fixed
// 88x32 and border-box would keep the metrics either way, but this also keeps
// the text from shifting a pixel as the border appears.
function FilterTag({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`caption shrink-0 w-5.5 h-2 rounded-sm border-1 cursor-pointer transition ease-in duration-200 hover:bg-background-secondary/40 ${
        selected
          ? "bg-background-secondary/40 border-baseBlack"
          : "bg-transparent border-transparent"
      }`}
    >
      {label}
    </button>
  );
}

export default FilterTag;
