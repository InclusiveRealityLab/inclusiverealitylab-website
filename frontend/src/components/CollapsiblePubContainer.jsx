import { forwardRef, useEffect, useState } from "react";
import PublicationsContainer from "./PublicationsContainer";

import up from "../assets/icons/up.svg";
import down from "../assets/icons/down.svg";

const CollapsiblePubContainer = forwardRef(
  ({ data, isExpandedContainer, children }, ref) => {
    const [isExpanded, setIsExpanded] = useState(isExpandedContainer);

    useEffect(() => {
      setIsExpanded(isExpandedContainer);
    }, [isExpandedContainer]);

    return (
      <>
        <div
          className="flex flex-col w-full gap-1.5 min-h-[200px]"
          ref={ref}
          data-year={data.year}
        >
          <div className="flex flex-row w-full justify-between items-center py-0.5">
            <h2 className="heading4 ">{data.year}</h2>
            <button
              className="label text-white"
              onClick={() => {
                setIsExpanded((prev) => !prev);
              }}
            >
              <img src={isExpanded ? up : down} />
            </button>
          </div>
          {/* {isExpanded && children} */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isExpanded ? "max-h-[9999px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {children}
          </div>
        </div>
      </>
    );
  }
);

export default CollapsiblePubContainer;
