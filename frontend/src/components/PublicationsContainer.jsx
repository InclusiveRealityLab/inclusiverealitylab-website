import PublicationListItem from "./PublicationListItem";

function PublicationsContainer({ publications }) {
  return (
    <>
      <div className="xl:flex xl:flex-col xl:items-center grid justify-items-center gap-1.5 w-full grid-cols-[repeat(auto-fit,minmax(272px,1fr))]">
        {publications &&
          publications.map((pub) => (
            <PublicationListItem key={pub["ID"]} publication={pub} />
          ))}
      </div>
    </>
  );
}

export default PublicationsContainer;
