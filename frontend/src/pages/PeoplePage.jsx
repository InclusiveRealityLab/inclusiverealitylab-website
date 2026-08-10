import { useState, useEffect } from "react";
import axios from "axios";

import peopleCategories from "../sampleData/peopleCategories";
import CategoryContainer from "../components/CategoryContainer";
import PageTitleSection from "../components/PageTitleSection";
import extractData from "../utils/extractData.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

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
          <div className="flex min-h-screen w-full items-center justify-center">
            <LoadingSpinner />
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
