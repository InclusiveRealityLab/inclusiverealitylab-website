import PeopleCard from "./PeopleCard";
import PeopleContainer from "./PeopleContainer";

function CategoryContainer({ category, people }) {
  console.log("Rendering", category, "people:", people);

  return (
    <div className="flex flex-col gap-2.5 w-full">
      <p className="heading4">{category}</p>

      {category.toLowerCase() === "lab" && (
        <>
          {/* Director */}
          <div className="flex flex-row flex-wrap w-full ">
            <PeopleCard person={people.find((p) => p.role === "director")} />
          </div>

          {/* Designer, Engineer, Mental Health Manager */}
          <div className="flex flex-row flex-wrap w-full gap-1.5 ">
            <PeopleCard person={people.find((p) => p.role === "designer")} />
            <PeopleCard person={people.find((p) => p.role === "engineer")} />
            <PeopleCard
              person={people.find((p) => p.role === "mental_health_manager")}
            />
          </div>

          {/* Other grouped roles */}
          {[
            ...new Set(
              people
                .filter(
                  (person) =>
                    ![
                      "director",
                      "designer",
                      "engineer",
                      "mental_health_manager",
                    ].includes(person.role)
                )
                .map((person) => person.role)
            ),
          ].map((role) => {
            const items = people.filter((p) => p.role === role);
            return <PeopleContainer key={role} data={{ role, items }} />;
          })}
        </>
      )}

      {/* For other categories like 'collaborator' or 'alumni' */}
      {category.toLowerCase() !== "lab" && (
        <div className="flex flex-row flex-wrap gap-1.5 w-full ">
          {people.map((person) => (
            <PeopleCard key={person.id} person={person} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryContainer;
