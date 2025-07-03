import CollapsiblePubContainer from "../components/CollapsiblePubContainer";
import PublicationSectionWrapper from "../components/wrappers/PublicationSectionWrapper";
import publications from "../sampleData/publications";

function PublicationsPage() {
  return (
    <>
      <PublicationSectionWrapper headingContent="Publications">
        {[...new Set(publications.map((pub) => pub.year))].map((year) => {
          const items = publications.filter((pub) => pub.year === year);
          return <CollapsiblePubContainer key={year} data={{ year, items }} />;
        })}
      </PublicationSectionWrapper>
    </>
  );
}

export default PublicationsPage;
