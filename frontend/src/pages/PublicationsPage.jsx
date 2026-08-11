import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import PublicationsContainer from "../components/PublicationsContainer";
import PageTitleSection from "../components/PageTitleSection";
import SectionTabs from "../components/tabs/SectionTabs";
import extractData from "../utils/extractData";
import scrollListToTop from "../utils/scrollListToTop";

const publishYear = (publication) =>
  new Date(publication["Publish Date"]).getFullYear();

function PublicationsPage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [publications, setPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [year, setYear] = useState(null);

  // Everything is fetched up front rather than paged on scroll: the year
  // tabs have to know every year, and deriving that from a partial list would
  // mean fetching it all anyway. The whole set is a few tens of KB.
  //
  // resource=all is still paged server-side and silently caps at 20 when no
  // limit is given, so this walks the pages until one comes back short rather
  // than trusting a single large limit.
  useEffect(() => {
    async function loadPublications() {
      const PAGE_SIZE = 100;
      const all = [];
      try {
        for (let offset = 0; ; offset += PAGE_SIZE) {
          const res = await axios.get(API_BASE_URL, {
            params: {
              entity: "publications",
              resource: "all",
              offset,
              limit: PAGE_SIZE,
            },
          });
          const batch = extractData(res.data);
          all.push(...batch);
          if (batch.length < PAGE_SIZE) break;
        }
        setPublications(all);
      } catch (error) {
        console.error("Error fetching publications:", error);
        setPublications(all);
      } finally {
        setIsLoading(false);
      }
    }
    loadPublications();
  }, []);

  const years = useMemo(
    () =>
      [...new Set(publications.map(publishYear).filter(Boolean))]
        .sort((a, b) => b - a)
        .map(String),
    [publications]
  );

  // The default year is derived during render rather than set in an effect.
  // An effect runs after paint, so there would be a painted frame where the
  // data had arrived but year was still null -- which filters to nothing and
  // flashes an empty list before refilling.
  const activeYear = year ?? years[0] ?? null;

  const handleYearChange = (next) => {
    setYear(next);
    scrollListToTop();
  };

  const shown = useMemo(
    () => publications.filter((p) => String(publishYear(p)) === activeYear),
    [publications, activeYear]
  );

  return (
    <div className="w-screen">
      <PageTitleSection title="Publications">
        <SectionTabs
          options={years}
          value={activeYear}
          onChange={handleYearChange}
          label="Publication years"
          isLoading={isLoading}
        />
      </PageTitleSection>

      <div className="pageShell items-start xl:mx-auto">
        <PublicationsContainer
          publications={shown}
          year={year}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default PublicationsPage;
