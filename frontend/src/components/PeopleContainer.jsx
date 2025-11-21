import { useEffect } from "react";
import PeopleCard from "./PeopleCard";

function PeopleContainer({ data }) {
  useEffect(() => {
    
  }, [data]);
  return (
    <>
      {data && (
        <div className="flex flex-row flex-wrap gap-y-1.5 gap-x-[23px] ">
          {data.items.map((p) => {
            
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
