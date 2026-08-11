import PeopleCard from "./PeopleCard";
import PeopleContainer from "./PeopleContainer";

// One group of people. The heading that used to label each group is gone --
// the section tab in the page title names the group now -- but the Lab group
// keeps its internal order: the director alone, then the staff row, then a row
// per remaining role. Those rows sit 40px apart, per the design.
function CategoryContainer({ category, people }) {
  if (!people) return null;

  // Sort people by place before anything else
  const sortedPeople = [...people].sort(
    (a, b) => (a.place ?? 99) - (b.place ?? 99)
  );

  const STAFF_ROLES = ["director", "designer", "engineer", "wellbeing manager"];
  const roleOf = (person) => person["Role"].toLowerCase();
  const byRole = (role) => sortedPeople.find((p) => roleOf(p) === role);

  return (
    <div className="flex flex-col gap-2.5 w-full">
      {category.toLowerCase() === "lab" ? (
        <>
          {/* Director */}
          <div className="flex flex-row flex-wrap w-full">
            <PeopleCard person={byRole("director")} />
          </div>

          {/* Designer, Engineer, Wellbeing Manager */}
          <div className="flex flex-row flex-wrap w-full gap-x-peopleGutter xl:gap-x-1.5">
            <PeopleCard person={byRole("designer")} />
            <PeopleCard person={byRole("engineer")} />
            <PeopleCard person={byRole("wellbeing manager")} />
          </div>

          {/* Other grouped roles in sorted order */}
          {[
            ...new Set(
              sortedPeople
                .filter((person) => !STAFF_ROLES.includes(roleOf(person)))
                .map((person) => person["Role"])
            ),
          ].map((role) => {
            const items = sortedPeople.filter((p) => p["Role"] === role);
            return <PeopleContainer key={role} data={{ role, items }} />;
          })}
        </>
      ) : (
        <div className="flex flex-row flex-wrap gap-y-1.5 gap-x-peopleGutter xl:gap-x-1.5 w-full">
          {sortedPeople.map((person) => (
            <PeopleCard key={person.ID} person={person} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryContainer;
