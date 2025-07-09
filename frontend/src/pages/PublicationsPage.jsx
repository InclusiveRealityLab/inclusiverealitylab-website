import CollapsiblePubContainer from "../components/CollapsiblePubContainer";
import PublicationsContainer from "../components/PublicationsContainer";
import PublicationSectionWrapper from "../components/wrappers/PublicationSectionWrapper";
import publications from "../sampleData/publications";

function PublicationsPage() {
  return (
    <div className="mt-4">
      <PublicationSectionWrapper headingContent="Publications">
        {[...new Set(publications.map((pub) => pub.year))].map((year) => {
          const items = publications.filter((pub) => pub.year === year);
          return <><CollapsiblePubContainer key={year} data={{ year, items }} ><PublicationsContainer publications={items}/></CollapsiblePubContainer></>;
        })}
      </PublicationSectionWrapper>
    </div>
  );
}

export default PublicationsPage;
