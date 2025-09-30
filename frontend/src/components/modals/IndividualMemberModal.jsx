import closeBlack from "../../assets/icons/closeBlack.svg";
import ReactDOM from "react-dom";
import Modal from "./Modal";
import ProfilePhotoContainer from "../ProfilePhotoContainer";

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
          horizontalGap="[48px]"
        >
          <div className="xl:w-[1008px] w-full border-black border-2 flex flex-col gap-[64px] ">
            <div className="w-full flex flex-col gap-[40px] items-center">
              <ProfilePhotoContainer person={person} />
              <div className="flex flex-col max-w-[640px] gap-1 items-center justify-center">
                <p className="heading2 align-center">{`${person["Given Name"]} ${person["Family Name"]}`}</p>
                <p className="bodyBig text-center">{ person["Affiliation"] ? person["Affiliation"] : person["Role"]} </p> 
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default IndividualMemberModal;
