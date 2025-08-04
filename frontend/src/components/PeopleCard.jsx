import defaultProfilePhoto from "../assets/images/defaultProfilePhotoPlaceholder.png"; 
import splitName from "../utils/splitName";
import formatProfilePhotoURL from "../utils/createProfilePhotoURL";

function PeopleCard({ person }) {
  // const isActive = ["Lab", "Collaborator"].includes(person.category);

  return (
    <>
      {person && (
        <>
          <div
            className={`flex flex-col items-center gap-1 
        xl:w-15  w-9.5 group
        ${
          ["Lab", "Collaborator"].includes(person.category)
            ? "xl:h-22.5 h-20 "
            : "xl:h-6 h-6"
        }
      `}
          >
            {["Lab", "Collaborator"].includes(person.category) && (
              <div className="xl:w-15 xl:h-15 w-9.5 h-9.5 ">
                <img
                  src={person?.profile ? formatProfilePhotoURL(person) : defaultProfilePhoto}
                  className=" w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0"
                ></img>
              </div>
            )}
            <div className="flex flex-col justify-between items-center heading4 w-full gap-0.5 xl:min-h-[85px] ">
              <div className="flex flex-col justify-between  items-center heading4 ">
                <p>{person["given name"]} </p>
                <p>{person["family name"]} </p>
              </div>
              <p className="bodySmall">{person?.role}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default PeopleCard;
