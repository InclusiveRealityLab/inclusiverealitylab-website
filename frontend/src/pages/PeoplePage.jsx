// import people from "../sampleData/people";
import peopleCategories from "../sampleData/peopleCategories";
import peopleRoles from "../sampleData/peopleRole";
import PeopleCard from "../components/PeopleCard";
import CategoryContainer from "../components/CategoryContainer";
import API_BASE_URL from "../sampleData/constants";
import { useState, useEffect } from "react";
import axios from "axios";

function PeoplePage() {
  const [people, setPeopleData] = useState([]);

  useEffect(() => {
    async function loadPeople() {
      try {
        const response = await axios.get(`${API_BASE_URL}/people`);
        const data = await response.data;
        setPeopleData(data);
        console.log("People data loaded:", data);
      } catch (error) {
        console.error("Error fetching people data:", error);
      }
    }
    loadPeople();
  }, []);

  return (
    <>
      {" "}
      {people.length && (
        <div className="mt-4 w-screen h-auto">
          <div className=" flex flex-col px-1.5 xl:px-0 justify-between items-start py-5 gap-4 w-full xl:max-w-[1032px]  xl:mx-auto">
            <h1 className="heading1 self-start">People</h1>

            {peopleCategories.map((cat) => {
              const filteredPeople = people.filter(
                (p) => p.category === cat.name
              );

              return (
                <>
                  <CategoryContainer
                    key={cat.id}
                    category={cat.name}
                    people={filteredPeople}
                  />
                 
                </>
              );
            })}

            {/* <PeopleCard person={people.find((p) => p.category == "lab")} /> */}
          </div>
        </div>
      )}
    </>
  );
}

export default PeoplePage;
