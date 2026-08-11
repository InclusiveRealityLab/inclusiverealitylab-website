import PublicationListItem from "./PublicationListItem";
import PublicationListItemSkeleton from "./skeletons/PublicationListItemSkeleton";

const SKELETON_COUNT = 3;

function PublicationsContainer({ publications, isLoading = false }) {
  return (
    <>
      <div
        className="xl:flex xl:flex-col xl:items-center grid justify-items-center gap-1.5 w-full grid-cols-[repeat(auto-fit,minmax(272px,1fr))]"
        aria-busy={isLoading}
      >
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }, (_, i) => (
              <PublicationListItemSkeleton key={i} />
            ))
          : publications &&
            publications.map((pub) => (
              <PublicationListItem key={pub["ID"]} publication={pub} />
            ))}
      </div>
    </>
  );
}

export default PublicationsContainer;
