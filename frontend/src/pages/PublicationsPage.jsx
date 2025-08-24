import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import axios from "axios";
import CollapsiblePubContainer from "../components/CollapsiblePubContainer";
import PublicationsContainer from "../components/PublicationsContainer";
import PublicationSectionWrapper from "../components/wrappers/PublicationSectionWrapper";

import extractData from "../utils/extractData";
import LoadingSpinner from "../components/LoadingSpinner";


const LIMIT = 20;

function PublicationsPage() {
  const [loadedPublications, setLoadedPublications] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreRef = useRef(null);
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchPublications = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const res = await axios.get(API_BASE_URL, {
        params: {
          entity: "publications",
          resource: "all",
          offset,
          limit: LIMIT,
        },
      });
      const newPubs = extractData(res.data);

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
  }, [offset, isLoading, hasMore]);

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
  }, [hasMore, fetchPublications]);

  const yearlyPublications = useMemo(() => {
    const grouped = {};
    loadedPublications.forEach((pub) => {
      const year = new Date(pub["Publish Date"]).getFullYear();
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
            className="h-22 flex self-center items-center justify-center"
          >
            {isLoading ? (
             <LoadingSpinner/>
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
