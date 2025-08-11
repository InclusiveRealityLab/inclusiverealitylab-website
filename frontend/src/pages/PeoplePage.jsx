// import people from "../sampleData/people";
import peopleCategories from "../sampleData/peopleCategories";
import peopleRoles from "../sampleData/peopleRole";
import PeopleCard from "../components/PeopleCard";
import CategoryContainer from "../components/CategoryContainer";
// import API_BASE_URL from "../sampleData/constants";
import { useState, useEffect } from "react";
import axios from "axios";
import loading from "../assets/icons/loading.svg";
import extractData from "../utils/extractData.js"

function PeoplePage() {
   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [people, setPeopleData] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    async function loadPeople() {
      try {
        const response = await axios.get(`${API_BASE_URL}?entity=people&resource=all`);
        const data = response.data;
        
        setPeopleData(extractData(data));
        setisLoading(false);
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
      
        <div className="mt-4 w-screen h-auto">
          <div className=" flex flex-col px-1.5 xl:px-0 justify-between items-start py-5 gap-4 w-full xl:max-w-[1032px]  xl:mx-auto">
            <h1 className="heading1 self-start">People</h1>

            {isLoading ? (<div className="flex min-h-screen w-full items-center justify-center">
                      <img src={loading} className="w-2.5 h-2.5" />
                    </div>) : 

            peopleCategories.map((cat) => {
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
      
    </>
  );
}

export default PeoplePage;
