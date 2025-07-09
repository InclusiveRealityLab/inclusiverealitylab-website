import CollapsiblePubContainer from "../components/CollapsiblePubContainer";
import PublicationsContainer from "../components/PublicationsContainer";
import PublicationSectionWrapper from "../components/wrappers/PublicationSectionWrapper";
import publications from "../sampleData/publications";
import { useState,useEffect,useRef } from "react";

function PublicationsPage() {
  const uniqueYears = [...new Set(publications.map((pub) => pub.year))];
  const yearsSorted = [...uniqueYears].sort((a, b) => b - a);

  const yearlyPublications = [...yearsSorted].map((year) => {
    const items = publications.filter((pub) => pub.year === year);
    return { year, items };
  });

  const [yearsOpen, setYearsOpen] = useState([yearsSorted[0]]);
  const containerRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const updatedOpenYears = new Set([yearsSorted[0]]);
        entries.forEach((entry) => {
          const year = entry.target.getAttribute("data-year");
          if (!year) {
            return;
          }
          if (entry.isIntersecting) {
            updatedOpenYears.add(parseInt(year));
          }
        });

        const newOpen = Array.from(updatedOpenYears);
        setYearsOpen((prev) => {
          const same =
            prev.length === newOpen.length &&
            prev.every((v) => newOpen.includes(v));
          return same ? prev : newOpen;
        });
      },
      {
        threshold: 0.,
        rootMargin: "0px 0px -100px 0px",
      }
    );
    yearsSorted.forEach((year) => {
      const ref = containerRefs.current[year];
      if (ref) {
        observer.observe(ref);
      }
    });
    return () => {
      Object.values(containerRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [yearsSorted]);

  return (
    <div className="mt-4">
      <PublicationSectionWrapper headingContent="Publications">
        {yearlyPublications.map(({ year, items }, index) => (
          <CollapsiblePubContainer
            key={year}
            data={{ year, items }}
            isExpandedContainer={yearsOpen.includes(year)}
            ref={(el) => (containerRefs.current[year] = el)}
          >
            <PublicationsContainer publications={items} year={year} />
          </CollapsiblePubContainer>
        ))}
      </PublicationSectionWrapper>
    </div>
  );
}

export default PublicationsPage;
