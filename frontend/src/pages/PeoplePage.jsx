import { useState, useEffect } from "react";
import axios from "axios";

import peopleCategories from "../sampleData/peopleCategories";
import CategoryContainer from "../components/CategoryContainer";
import PageTitleSection from "../components/PageTitleSection";
import extractData from "../utils/extractData.js";
import Skeleton from "../components/skeletons/Skeleton.jsx";
import PeopleCardSkeleton from "../components/skeletons/PeopleCardSkeleton.jsx";

function PeoplePage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [people, setPeopleData] = useState([]);
  const [isLoading, setisLoading] = useState(true);

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

  return (
    <div className="w-screen">
      {/* Same sticky title as Projects and Publications, without a filter */}
      <PageTitleSection title="People" />

      <div className="pageShell items-start xl:mx-auto">
        {isLoading ? (
          /* one category block, mirroring CategoryContainer's heading + wrap */
          <div className="flex flex-col gap-2.5 w-full" aria-busy="true">
            <Skeleton className="w-8 h-2 rounded-sm" />
            <div className="flex flex-row flex-wrap gap-1.5 w-full">
              {Array.from({ length: 6 }, (_, i) => (
                <PeopleCardSkeleton key={i} />
              ))}
            </div>
          </div>
        ) : (
          peopleCategories.map((cat) => (
            <CategoryContainer
              key={cat.id}
              category={cat.name}
              people={people.filter((p) => p.category === cat.name)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default PeoplePage;
