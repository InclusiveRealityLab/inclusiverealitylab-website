import PeopleCard from "./PeopleCard";

function PeopleContainer({ data }) {
  if (!data) return null;

  return (
    <div className="flex flex-row flex-wrap gap-y-1.5 gap-x-peopleGutter xl:gap-x-1.5">
      {data.items.map((p) => (
        <PeopleCard key={p.ID} person={p} />
      ))}
    </div>
  );
}

export default PeopleContainer;
