import Modal from "./Modal";
import SocialMediaHandleContainer from "../SocialMediaHandleContainer";

function JoinModal({ children, onClose, backgroundColor }) {
  return (
    <>
      <Modal onClose={onClose} backgroundColor="bg-background-secondary">
        <div className=" xl:w-33 w-full px-1.5 xl:px-0 flex flex-col gap-2 xl:gap-2">
          <h1 className="heading1 overflow-wrap hyphens-auto">
            Looking for opportunities to join us?
          </h1>
          <p className="body">
            As a new lab, we’re open to conversations and collaborations in many
            forms. Feel free to explore our projects and publications, if our
            work at the Inclusive Reality Lab resonates with your interests,
            don’t hesitate to reach out at inclusiverealitylab[at]gmail.com.{" "}
            <br></br>
            Someone from our team or our director will be happy to get back to
            you soon. <br></br> Feel free to follow our social media accounts as
            well.
          </p>
          <SocialMediaHandleContainer iconColor="blk" />
        </div>
      </Modal>
    </>
  );
}

export default JoinModal;
