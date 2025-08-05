// import PeopleCard from "./PeopleCard";
// import PeopleContainer from "./PeopleContainer";
// import peopleRoles from "../sampleData/peopleRole";

// function CategoryContainer({ category, people }) {
//   console.log("Rendering", category, "people:", people);

//   return (
//     <div className="flex flex-col gap-2.5 w-full">
//       <p className="heading4">{category}</p>

//       {category.toLowerCase() === "lab" && (
//         <>
//           {/* Director */}
//           <div className="flex flex-row flex-wrap w-full ">
//             <PeopleCard person={people.find((p) => p.role.toLowerCase() === "director")} />
//           </div>

//           {/* Designer, Engineer, Mental Health Manager */}
//           <div className="flex flex-row flex-wrap w-full gap-1.5 ">
//             <PeopleCard person={people.find((p) => p.role.toLowerCase() === "designer")} />
//             <PeopleCard person={people.find((p) => p.role.toLowerCase() === "engineer")} />
//             <PeopleCard
//               person={people.find((p) => p.role.toLowerCase() === "wellbeing manager")}
//             />
//           </div>

//           {/* Other grouped roles */}
//           {[
//             ...new Set(
//               people
//                 .filter(
//                   (person) =>
//                     ![
//                       "director",
//                       "designer",
//                       "engineer",
//                       "wellbeing manager",
//                     ].includes(person.role)
//                 )
//                 .map((person) => person.role)
//             ),
//           ].map((role) => {
//             const items = people.filter((p) => p.role === role).sort((a, b) => (a.place) - (b.place));
//             {console.log(`${items}`)}
//             return <PeopleContainer key={role} data={{ role, items }} />;
//           })}
//         </>
//       )}

//       {/* For other categories like 'collaborator' or 'alumni' */}
//       {category.toLowerCase() !== "lab" && (
//         <div className="flex flex-row flex-wrap gap-1.5 w-full ">
//           {people.map((person) => (
//             <PeopleCard key={person.id} person={person} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default CategoryContainer;


import PeopleCard from "./PeopleCard";
import PeopleContainer from "./PeopleContainer";

function CategoryContainer({ category, people }) {
  console.log("Rendering", category, "people:", people);

  // Sort people by place before anything else
  const sortedPeople = [...people].sort(
    (a, b) => (a.place ?? 99) - (b.place ?? 99)
  );

  return (
    <div className="flex flex-col gap-2.5 w-full">
      <p className="heading4">{category === "Lab" ? "Lab members" : category}</p>

      {category.toLowerCase() === "lab" && (
        <>
          {/* Director */}
          <div className="flex flex-row flex-wrap w-full ">
            <PeopleCard person={sortedPeople.find((p) => p.role.toLowerCase() === "director")} />
          </div>

          {/* Designer, Engineer, Mental Health Manager */}
          <div className="flex flex-row flex-wrap w-full gap-1.5 ">
            <PeopleCard person={sortedPeople.find((p) => p.role.toLowerCase() === "designer")} />
            <PeopleCard person={sortedPeople.find((p) => p.role.toLowerCase() === "engineer")} />
            <PeopleCard
              person={sortedPeople.find((p) => p.role.toLowerCase() === "wellbeing manager")}
            />
          </div>

          {/* Other grouped roles in sorted order */}
          {[...new Set(
            sortedPeople
              .filter(
                (person) =>
                  !["director", "designer", "engineer", "wellbeing manager"].includes(
                    person.role.toLowerCase()
                  )
              )
              .map((person) => person.role)
          )].map((role) => {
            const items = sortedPeople.filter((p) => p.role === role);
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
  );
}

export default CategoryContainer;
