import PeopleCard from "./PeopleCard";
import PeopleContainer from "./PeopleContainer";

function CategoryContainer({ category, people }) {
  console.log("Rendering", category, "people:", people);

  // Sort people by place before anything else
  const sortedPeople = [...people].sort(
    (a, b) => (a.place ?? 99) - (b.place ?? 99)
  );

  return (
    < >{people && (
      <div className="flex flex-col gap-2.5 w-full">
      <p className="heading4">{category === "Lab" ? "Lab members" : category}</p>

      {category.toLowerCase() === "lab" && (
        <>
          {/* Director */}
          <div className="flex flex-row flex-wrap w-full ">
            <PeopleCard person={sortedPeople.find((p) => p["Role"].toLowerCase() === "director")} />
          </div>

          {/* Designer, Engineer, Mental Health Manager */}
          <div className="flex flex-row flex-wrap w-full gap-x-[23px] ">
            <PeopleCard person={sortedPeople.find((p) => p["Role"].toLowerCase() === "designer")} />
            <PeopleCard person={sortedPeople.find((p) => p["Role"].toLowerCase() === "engineer")} />
            <PeopleCard
              person={sortedPeople.find((p) => p["Role"].toLowerCase() === "wellbeing manager")}
            />
          </div>

          {/* Other grouped roles in sorted order */}
          {[...new Set(
            sortedPeople
              .filter(
                (person) =>
                  !["director", "designer", "engineer", "wellbeing manager"].includes(
                    person["Role"].toLowerCase()
                  )
              )
              .map((person) => person["Role"])
          )].map((role) => {
            const items = sortedPeople.filter((p) => p["Role"] === role);
            return <PeopleContainer key={role} data={{ role, items }} />;
          })}
        </>
      )}

      {category.toLowerCase() !== "lab" && (
        <div className="flex flex-row flex-wrap gap-1.5 w-full ">
          {sortedPeople.map((person) => (
            <PeopleCard key={person.id} person={person} />
          ))}
        </div>
      )}
    </div>
  )}</>
   
    
  );
}

export default CategoryContainer;
