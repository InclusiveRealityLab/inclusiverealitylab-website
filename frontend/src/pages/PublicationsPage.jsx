import CollapsiblePubContainer from "../components/CollapsiblePubContainer";
import PublicationsContainer from "../components/PublicationsContainer";
import PublicationSectionWrapper from "../components/wrappers/PublicationSectionWrapper";
import publications from "../sampleData/publications";
import { useState } from "react";

function PublicationsPage() {
  const uniqueYears = [...new Set(publications.map((pub) => pub.year))];
  const yearsSorted = [...uniqueYears].sort((a, b) => b - a);

  const yearlyPublications = [...yearsSorted].map((year) => {
    const items = publications.filter((pub) => pub.year === year);
    return { year, items };
  });

  const [yearsOpen, setYearsOpen] = useState([yearsSorted[0]]);

  return (
    <div className="mt-4">
      <PublicationSectionWrapper headingContent="Publications">
        {yearlyPublications.map(({ year, items }, index) => (
          <CollapsiblePubContainer
            key={year}
            data={{ year, items }}
            isExpandedContainer={yearsOpen.includes(year)}
          >
            <PublicationsContainer publications={items} year={year} />
          </CollapsiblePubContainer>
        ))}
      </PublicationSectionWrapper>
    </div>
  );
}

export default PublicationsPage;
