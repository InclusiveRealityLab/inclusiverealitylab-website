import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import axios from "axios";
import CollapsiblePubContainer from "../components/CollapsiblePubContainer";
import PublicationsContainer from "../components/PublicationsContainer";
import PublicationSectionWrapper from "../components/wrappers/PublicationSectionWrapper";
import loading from "../assets/icons/loading.svg";
import API_BASE_URL from "../sampleData/constants";

const LIMIT = 20;

function PublicationsPage() {
  const [loadedPublications, setLoadedPublications] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreRef = useRef(null);

  const fetchPublications = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/publications`, {
        params: {
          offset,
          limit: LIMIT,
        },
      });

      const newPubs = res.data;

      if (newPubs.length < LIMIT) {
        setHasMore(false);
      }

      setLoadedPublications((prev) => [...prev, ...newPubs]);
      setOffset((prev) => prev + LIMIT);
    } catch (err) {
      console.error("Error fetching publications:", err);
    } finally {
      setIsLoading(false);
    }
  }, [offset, isLoading, hasMore]); // Add dependencies

  // Then your useEffect can safely include it
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchPublications();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, fetchPublications]); // Now it's memoized, so it's safe
  // Group by year
  const yearlyPublications = useMemo(() => {
    const grouped = {};
    loadedPublications.forEach((pub) => {
      const year = new Date(pub["publish date"]).getFullYear();
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(pub);
    });

    return Object.keys(grouped)
      .map(Number)
      .sort((a, b) => b - a)
      .map((year) => ({
        year,
        items: grouped[year],
      }));
  }, [loadedPublications]);

  const yearsOpen = useMemo(
    () => yearlyPublications.map((y) => y.year),
    [yearlyPublications]
  );

  return (
    <div className="mt-4">
      <PublicationSectionWrapper headingContent="Publications">
        {yearlyPublications.map(({ year, items }) => (
          <CollapsiblePubContainer
            key={year}
            data={{ year, items }}
            isExpandedContainer={yearsOpen.includes(year)}
          >
            <PublicationsContainer publications={items} year={year} />
          </CollapsiblePubContainer>
        ))}

        {hasMore && (
          <div
            ref={loadMoreRef}
            className="h-22 flex items-center justify-center"
          >
            {isLoading ? (
              <img src={loading} className="w-6 h-6" alt="loading..." />
            ) : (
              <div>Load More</div>
            )}
          </div>
        )}
      </PublicationSectionWrapper>
    </div>
  );
}

export default PublicationsPage;
