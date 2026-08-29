import { useState } from "react";
import IndividualMemberModal from "./modals/IndividualMemberModal";
import ProfilePhotoContainer from "./ProfilePhotoContainer";

function PeopleCard({ person }) {
 
  const [isPersonModalOpen, setIsPersonModalOpen] = useState(false);

  return (
    <>
      {person && (
        <>
          <div
            className={`flex flex-col items-center gap-1 cursor-pointer
        xl:w-15  w-9.5 group
        ${
          ["Lab", "Collaborator"].includes(person.category)
            ? "xl:h-22.5 "
            : "xl:h-6 h-6"
        }
      `} onClick={() => setIsPersonModalOpen(true)}
          >
            {["Lab", "Collaborator"].includes(person.category) && (
              
              <ProfilePhotoContainer photoStyle={"grayscale group-hover:grayscale-0"} person={person} />
              
            )}
            {/* text-center sits on the container so it reaches every line.
                items-center only centres the block, which looks identical
                until something wraps -- "Undergraduate Student" does, at the
                mobile card width. */}
            <div className="flex flex-col justify-between items-center text-center heading4 w-full gap-0.5 xl:min-h-[85px] ">
              <div className="flex flex-col justify-between items-center heading4">
                <p>{person["Given Name"]} </p>
                <p>{person["Family Name"]} </p>
              </div>
              {person["Affiliation"] && person["Role"] == "Collaborator" ? (<p className="bodySmall">{person["Affiliation"]}</p>) : (<p className="bodySmall">{person["Role"]}</p>) }
            </div>
          </div>
        </>
      )}
      {/* modal here */}
      {isPersonModalOpen && (
        <IndividualMemberModal onClose={() => setIsPersonModalOpen(false)} person={person}/>
      )}
    </>
  );
}

export default PeopleCard;
