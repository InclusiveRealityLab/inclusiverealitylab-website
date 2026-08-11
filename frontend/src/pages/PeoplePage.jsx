import { useState, useEffect } from "react";
import axios from "axios";

import peopleCategories from "../sampleData/peopleCategories";
import CategoryContainer from "../components/CategoryContainer";
import PageTitleSection from "../components/PageTitleSection";
import SectionTabs from "../components/tabs/SectionTabs";
import extractData from "../utils/extractData.js";
import scrollListToTop from "../utils/scrollListToTop.js";
import PeopleCardSkeleton from "../components/skeletons/PeopleCardSkeleton.jsx";

const SECTIONS = peopleCategories.map((c) => c.label);

function PeoplePage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [people, setPeopleData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [section, setSection] = useState(SECTIONS[0]);

  useEffect(() => {
    async function loadPeople() {
      try {
        const response = await axios.get(
          `${API_BASE_URL}?entity=people&resource=all`
        );
        setPeopleData(extractData(response.data));
      } catch (error) {
        console.error("Error fetching people data:", error);
        setPeopleData([]);
      } finally {
        setisLoading(false);
      }
    }
    loadPeople();
  }, []);

  const handleSectionChange = (next) => {
    setSection(next);
    scrollListToTop();
  };

  // The tab carries the label; the sheet stores the name.
  const category = peopleCategories.find((c) => c.label === section);

  return (
    <div className="w-screen">
      {/* Same sticky title as Projects and Publications. The three options are
          fixed rather than derived from the data, so they need no placeholder
          while the people load. */}
      <PageTitleSection title="People">
        <SectionTabs
          options={SECTIONS}
          value={section}
          onChange={handleSectionChange}
          label="People groups"
        />
      </PageTitleSection>

      <div className="pageShell items-start xl:mx-auto">
        {isLoading ? (
          <div
            className="flex flex-row flex-wrap gap-y-1.5 gap-x-peopleGutter xl:gap-x-1.5 w-full"
            aria-busy="true"
          >
            {Array.from({ length: 8 }, (_, i) => (
              <PeopleCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <CategoryContainer
            category={category.name}
            people={people.filter((p) => p.category === category.name)}
          />
        )}
      </div>
    </div>
  );
}

export default PeoplePage;
