import FilterTag from "./FilterTag";

// Single-select row of tags. Scrolls horizontally once the options outgrow the
// column, which they will as publication years accumulate.
function WorkFilter({ options, value, onChange, label }) {
  if (!options.length) return null;

  return (
    <div
      role="group"
      aria-label={label}
      className="flex flex-row gap-1 w-full overflow-x-auto"
    >
      {options.map((option) => (
        <FilterTag
          key={option}
          label={option}
          selected={option === value}
          onClick={() => onChange(option)}
        />
      ))}
    </div>
  );
}

export default WorkFilter;
