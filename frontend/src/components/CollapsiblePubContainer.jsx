import { useState } from "react";
import PublicationsContainer from "./PublicationsContainer";

import up from "../assets/icons/up.svg";
import down from "../assets/icons/down.svg";

function CollapsiblePubContainer({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div className="flex flex-col bg-cyan-700 w-full ">
        <div className="flex flex-row w-full justify-between  py-0.5">
          <h2 className="heading4 ">{data.year}</h2>
          <button
            className="label bg-background-primary text-white"
            onClick={() => {
              setIsExpanded((prev) => !prev);
            }}
          >
            <img src={isExpanded ? up : down} />
          </button>
        </div>
        {isExpanded && <PublicationsContainer publications={data.items} />}
      </div>
    </>
  );
}

export default CollapsiblePubContainer;
