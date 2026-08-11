import Skeleton from "./Skeleton";

// Mirrors ProjectCard: 63:40 cover over a fixed h-7.5 info panel, inside the
// same bordered/rounded shell. Keep in step with ProjectCard.jsx.
function ProjectCardSkeleton({ className = "" }) {
  return (
    <div
      className={`${className} flex flex-col rounded-lg border-1 border-baseBlack bg-background-white overflow-hidden`}
      aria-hidden="true"
    >
      <Skeleton className="w-full aspect-[63/40] shrink-0" />
      <div className="flex flex-col gap-1 p-1 h-7.5 shrink-0">
        {/* the theme chip row, then the two-line title */}
        <Skeleton className="w-5.5 h-2 rounded-sm shrink-0" />
        <Skeleton className="w-full h-1.5 rounded-sm" />
      </div>
    </div>
  );
}

export default ProjectCardSkeleton;
