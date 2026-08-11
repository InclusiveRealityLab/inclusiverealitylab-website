import SectionTab from "./SectionTab";
import Skeleton from "../skeletons/Skeleton";

// A row of tabs switching which group of a page is shown -- project current/
// past, publication year, people group. Not a filter: exactly one option is
// always active, and they neither combine nor clear.
//
// Scrolls horizontally once the options outgrow the column, which they will as
// publication years accumulate. No scrollbar is shown.
//
// While the options are still being derived from a fetch -- the publication
// years are -- placeholder tags hold the row's height open. Collapsing to
// nothing and then appearing would shove the whole list down, since this sits
// in the sticky title above it.
const SKELETON_COUNT = 5;

function SectionTabs({ options, value, onChange, label, isLoading = false }) {
  if (!isLoading && !options.length) return null;

  return (
    <div
      role="group"
      aria-label={label}
      aria-busy={isLoading}
      className="noScrollbar flex flex-row gap-1 w-full overflow-x-auto"
    >
      {isLoading
        ? Array.from({ length: SKELETON_COUNT }, (_, i) => (
            <Skeleton key={i} className="w-5.5 h-2 rounded-sm shrink-0" />
          ))
        : options.map((option) => (
            <SectionTab
              key={option}
              label={option}
              selected={option === value}
              onClick={() => onChange(option)}
            />
          ))}
    </div>
  );
}

export default SectionTabs;
