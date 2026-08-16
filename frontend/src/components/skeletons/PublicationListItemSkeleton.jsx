import Skeleton from "./Skeleton";

// Mirrors PublicationListItem in its with-cover form: cover on top on mobile,
// flush right on desktop, against a fixed-height content block. Keep in step
// with PublicationListItem.jsx.
function PublicationListItemSkeleton() {
  return (
    <div
      className="flex flex-col xl:flex-row-reverse w-full max-w-25 xl:max-w-content rounded-lg border-1 border-element-black bg-element-white overflow-hidden"
      aria-hidden="true"
    >
      <Skeleton className="w-full aspect-[5/3] xl:aspect-auto xl:w-16 xl:h-10 shrink-0" />

      <div className="flex flex-col justify-between grow h-10.5 xl:h-10 p-1 xl:p-1.5">
        <div className="flex flex-col gap-0.5">
          {/* venue, then the title */}
          <Skeleton className="w-8 h-1 rounded-sm" />
          <Skeleton className="w-full h-1.5 rounded-sm" />
        </div>
        {/* the DOI / PDF buttons */}
        <div className="flex flex-row gap-1.5">
          <Skeleton className="w-6.5 h-2.5 rounded-sm" />
          <Skeleton className="w-6.5 h-2.5 rounded-sm" />
        </div>
      </div>
    </div>
  );
}

export default PublicationListItemSkeleton;
