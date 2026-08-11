import Modal from "./Modal";
import formatLink from "../../utils/formatLink";
import ProfilePhotoContainer from "../ProfilePhotoContainer";
import email from "../../assets/icons/email.svg";
import scholar from "../../assets/icons/google scholar.svg";
import linkedin from "../../assets/icons/linkedin.svg";
import facebook from "../../assets/icons/fb.svg";
import x from "../../assets/icons/x.svg";
import linkIcon from "../../assets/icons/link.svg";

// Same icon set and 32px sizing as the footer's social row.
const connectionPlatforms = [
  { name: "Email", key: "Email", icon: email },
  { name: "Google Scholar", key: "Google Scholar", icon: scholar },
  { name: "Linkedin", key: "Linkedin", icon: linkedin },
  { name: "Facebook", key: "Facebook", icon: facebook },
  { name: "X", key: "X", icon: x },
];

const hasContactInfo = (person) => {
  return connectionPlatforms.some((platform) => Boolean(person[platform.key]));
};

function IndividualMemberModal({ person, onClose }) {
  return (
    <>
      {person && (
        <Modal onClose={onClose} backgroundColor="bg-background-white">
          <div className="w-full xl:max-w-narrowBox mx-auto my-10 px-1.5 flex flex-col gap-4">
            <div className="w-full flex flex-col gap-2 xl:gap-2.5 items-center">
              <ProfilePhotoContainer person={person} />
              <div className="flex flex-col max-w-[640px] gap-1 items-center justify-center">
                <p className="heading3 text-center">{`${person["Given Name"]} ${person["Family Name"]}`}</p>
                <p className="bodyBig text-center">
                  {person["Affiliation"]
                    ? person["Affiliation"]
                    : person["Role"]}{" "}
                </p>
              </div>
            </div>
            {/* Optional about me section */}
            {person["Bio"] && (
              <div className="flex flex-col gap-1.5">
                <p className="heading4">About me</p>
                <p className="body">{person["Bio"]}</p>
              </div>
            )}
            {/* Optional areas of expertise section */}
            {person["Expertise"] && (
              <div className="flex flex-col gap-1.5">
                <p className="heading4">Areas of expertise</p>
                <p className="body">{person["Expertise"]}</p>
              </div>
            )}
            {/* Optional website section */}
            {person["Website"] && (
              <div className="flex flex-col gap-1.5">
                <p className="heading4">Website</p>
                <a
                  href={formatLink(person["Website"])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="body flex flex-row items-center gap-0.25 w-fit cursor-pointer"
                >
                  <img src={linkIcon} alt="" className="w-1.5 h-1.5 shrink-0" />
                  {formatLink(person["Website"])}
                </a>
              </div>
            )}
            {/* Optional contact section */}
            <div className="flex flex-col gap-1.5">
              {hasContactInfo(person) && (
                <>
                  <p className="heading4">Contact me</p>
                  <div className="flex flex-row gap-1.5  py-0.5">
                    {/* use absolute links when linking profiles */}
                    {connectionPlatforms.map((platform) => {
                      if (person[platform.key] && platform.key === "Email") {
                        return (
                          <a
                            href={`mailto:${person[platform.key]}`}
                            key={platform.key}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={platform.icon}
                              alt={`${platform.name} icon`}
                              className="w-2 h-2"
                            />
                          </a>
                        );
                      } else if (person[platform.key]) {
                        return (
                          <a
                            href={formatLink(person[platform.key])}
                            key={platform.key}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={platform.icon}
                              alt={`${platform.name} icon`}
                              className="w-2 h-2"
                            />
                          </a>
                        );
                      }
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default IndividualMemberModal;
