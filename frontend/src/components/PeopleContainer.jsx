import { useEffect } from "react";
import PeopleCard from "./PeopleCard";

function PeopleContainer({ data }) {
  useEffect(() => {
    console.log(Object.keys(data));
  }, [data]);
  return (
    <>
      {data && (
        <div className="flex flex-row flex-wrap gap-y-1.5 gap-x-[23px] ">
          {data.items.map((p) => {
            console.log("rendering the cards ");
            return (
              <>
               
                <PeopleCard key={p.ID} person={p} />
              </>
            );
          })}
        </div>
      )}
    </>
  );
}

export default PeopleContainer;
