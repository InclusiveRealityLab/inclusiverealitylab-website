import closeBlack from "../../assets/icons/closeBlack.svg";
import ReactDOM from "react-dom";
import Modal from "./Modal";
import ProfilePhotoContainer from "../ProfilePhotoContainer";
import email_blk from "../../assets/icons/email_blk.svg";
import scholar from "../../assets/icons/scholar_blk.svg";
import linkedin_blk from "../../assets/icons/linkedin_blk.svg";
import facebook_blk from "../../assets/icons/fb_blk.svg";
import x_blk from "../../assets/icons/x_blk.svg";

const connectionPlatforms = [
  { name: "Email", key: "Email", icon: email_blk },
  { name: "Google Scholar", key: "Google Scholar", icon: scholar },
  { name: "Linkedin", key: "Linkedin", icon: linkedin_blk },
  { name: "Facebook", key: "Facebook", icon: facebook_blk },
  { name: "X", key: "X", icon: x_blk },
];

const hasContactInfo = (person) => {
  return connectionPlatforms.some((platform)=> Boolean(person[platform.key]));
}

function IndividualMemberModal({
  person,
  onClose,
  backgroundColor,
  horizontalGap,
}) {
  return (
    <>
      {person && (
        <Modal
          onClose={onClose}
          backgroundColor="bg-background-white"
          horizontalGap="[0px]"
        >
          <div className="xl:w-[1008px] border-2 border-red my-[80px] xl:px-0 px-1.5 w-full  flex flex-col gap-[64px] ">
            <div className="w-full flex flex-col gap-[40px] items-center">
              <ProfilePhotoContainer person={person} />
              <div className="flex flex-col max-w-[640px] gap-1 items-center justify-center">
                <p className="heading2 text-center">{`${person["Given Name"]} ${person["Family Name"]}`}</p>
                <p className="bodyBig text-center">
                  {person["Affiliation"]
                    ? person["Affiliation"]
                    : person["Role"]}{" "}
                </p>
              </div>
            </div>
            {/* Optional about me section */}
            {person["Bio"] && (
              <div className="flex flex-col gap-1">
                <p className="heading4">About me</p>
                <p className="body">{person["Bio"]}</p>
              </div>
            )}
            {/* Optional areas of expertise section */}
            {person["Expertise"] && (
              <div className="flex flex-col gap-1">
                <p className="heading4">Areas of expertise</p>
                <p className="body">{person["Expertise"]}</p>
              </div>
            )}
            {/* Optional website section */}
            {person["Website"] && (
              <div className="flex flex-col gap-1">
                <p className="heading4">Website</p>
                <p className="body">
                  <a href={person["Website"]}>{person["Website"]}</a>
                </p>
              </div>
            )}
            {/* Optional contact section */}
            <div className="flex flex-col gap-1">
              {hasContactInfo(person) && 
                 (
                  <>
                    <p className="heading4">Contact me</p>
                    <div className="flex flex-row gap-1.5 border-2">
                      {connectionPlatforms.map((platform) => {
                        if (person[platform.key]) {
                          return (
                            <a href={person[platform.key]} key={platform.key}>
                              <img src={platform.icon} />
                            </a>
                          );
                        }
                      })}
                    </div>
                  </>
                )
             }
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default IndividualMemberModal;
