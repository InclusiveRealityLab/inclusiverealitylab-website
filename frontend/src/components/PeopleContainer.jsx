import PeopleCard from "./peopleCard";

function PeopleContainer({ data }) {
  return (
    <>
      <div className="flex flex-row flex-wrap gap-1.5">{
        data.items.map((p)=>{
            console.log("rendering the cards ");
            return(
                <PeopleCard key={p.id} person={p}/>
            )
        })}</div>
    </>
  );
}

export default PeopleContainer;
