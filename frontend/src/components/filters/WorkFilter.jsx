import FilterTag from "./FilterTag";
import Skeleton from "../skeletons/Skeleton";

// Single-select row of tags. Scrolls horizontally once the options outgrow the
// column, which they will as publication years accumulate.
//
// While the options are still being derived from a fetch -- the publication
// years are -- placeholder tags hold the row's height open. Collapsing to
// nothing and then appearing would shove the whole list down, since this sits
// in the sticky title above it.
const SKELETON_COUNT = 5;

function WorkFilter({ options, value, onChange, label, isLoading = false }) {
  if (!isLoading && !options.length) return null;

  return (
    <div
      role="group"
      aria-label={label}
      aria-busy={isLoading}
      className="flex flex-row gap-1 w-full overflow-x-auto"
    >
      {isLoading
        ? Array.from({ length: SKELETON_COUNT }, (_, i) => (
            <Skeleton key={i} className="w-5.5 h-2 rounded-sm shrink-0" />
          ))
        : options.map((option) => (
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
