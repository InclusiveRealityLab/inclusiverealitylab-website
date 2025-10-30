import defaultProfilePhoto from "../assets/images/defaultProfilePhotoPlaceholder.png";
import splitName from "../utils/splitName";
import formatProfilePhotoURL from "../utils/createProfilePhotoURL";
import Modal from "./modals/Modal";
import { useState } from "react";
import IndividualMemberModal from "./modals/IndividualMemberModal";
import ProfilePhotoContainer from "./ProfilePhotoContainer";

function PeopleCard({ person }) {
 
  const [isPersonModalOpen, setIsPersonModalOpen] = useState(false);
  const samplePerson = {
    "Given Name": "John",
    "Family Name": "Doe",
    "Affiliation": "University of Example",
  }

  return (
    <>
      {person && (
        <>
          <div
            className={`flex flex-col items-center gap-1 
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
            <div className="flex flex-col justify-between items-center heading4 w-full gap-0.5 xl:min-h-[85px] ">
              <div className="flex flex-col justify-between  items-center heading4 ">
                <p className="text-center">{person["Given Name"]} </p>
                <p>{person["Family Name"]} </p>
              </div>
              {person["Affiliation"] && person["Role"] == "Collaborator" ? (<p className="bodySmall text-center">{person["Affiliation"]}</p>) : (<p className="bodySmall">{person["Role"]}</p>) }
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
