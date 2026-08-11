import Skeleton from "./Skeleton";

// Mirrors PeopleCard in its photo-bearing form: round portrait over the name
// and role block. Keep in step with PeopleCard.jsx and ProfilePhotoContainer.
function PeopleCardSkeleton() {
  return (
    <div
      className="flex flex-col items-center gap-1 xl:w-15 w-9.5 xl:h-22.5"
      aria-hidden="true"
    >
      <Skeleton className="xl:w-12 xl:h-12 w-8 h-8 rounded-full shrink-0" />
      <div className="flex flex-col items-center w-full gap-0.5 xl:min-h-[85px]">
        <Skeleton className="w-7 h-1.5 rounded-sm" />
        <Skeleton className="w-5 h-1 rounded-sm" />
      </div>
    </div>
  );
}

export default PeopleCardSkeleton;
