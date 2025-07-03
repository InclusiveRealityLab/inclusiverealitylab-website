import people from "../sampleData/people";
import peopleCategories from "../sampleData/peopleCategories";
import peopleRoles from "../sampleData/peopleRole";
import PeopleCard from "../components/peopleCard";
import CategoryContainer from "../components/CategoryContainer";

function PeoplePage() {
  return (
    <>
      <div className="mt-4 w-screen h-auto">
        <div className=" flex flex-col px-1.5 xl:px-0 justify-between items-start py-5 gap-4 w-full xl:max-w-[1032px]  xl:mx-auto">
          <h1 className="heading1 self-start">People</h1>
          
          {peopleCategories.map((cat) => {
            const filteredPeople = people.filter((p) => p.category === cat.id);

            return (
              <CategoryContainer
                key={cat.id}
                category={cat.name}
                people={filteredPeople}
              />
            );
          })}
          
          {/* <PeopleCard person={people.find((p) => p.category == "lab")} /> */}
        </div>
      </div>
    </>
  );
}

export default PeoplePage;
