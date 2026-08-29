import Modal from "./Modal";
import SocialMediaHandleContainer from "../SocialMediaHandleContainer";
import ButtonPrimary from "../buttons/ButtonPrimary";
import check from "../../assets/icons/check.svg";
import processing from "../../assets/icons/processing.svg";
import { useRef, useState } from "react";

const POST_API = import.meta.env.VITE_API_POST_BASE_URL;

// Shared by all three fields: white fill, 1px black stroke, 4px radius, 16px
// of horizontal padding, and a placeholder in the invalid grey. The textarea
// overrides the height and adds vertical padding.
const FIELD =
  "bg-element-white w-full h-2.5 border-1 border-element-black rounded-sm px-1 body placeholder:text-text-invalid";

function ContactModal({ onClose }) {
  // handling the form submission for the contact form inside the contact modal
  const nameReference = useRef();
  const emailReference = useRef();
  const messageReference = useRef();

  const [status, setStatus] = useState("Send");

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setStatus("Sending");

    const form = new FormData();
    form.append("name", nameReference.current.value);
    form.append("email", emailReference.current.value);
    form.append("message", messageReference.current.value);

    try {
      const response = await fetch(POST_API, {
        method: "POST",
        body: form, // No headers needed for FormData
      });

      const result = await response.json(); // Parses JSON string returned from Apps Script
      

      if (result.success) {
        setStatus("Sent");
        setTimeout(() => {
          setStatus("Send");
          nameReference.current.value = "";
          emailReference.current.value = "";
          messageReference.current.value = "";
        }, 1000);
      } else {
        setStatus("Failed");
      }
    } catch (error) {
      console.error("❌ Fetch error:", error);
      setStatus("Failed");
      // this alerts the user about an error processing the message and closes the modal
      alert("Sorry there was an error sending your message, try again later");
      onClose();
    }
  };
  return (
    <>
      <Modal onClose={onClose} backgroundColor="bg-background-brand-secondary">
        {/* One column at a single 32px rhythm, so the title, copy, social row
            and form are all spaced alike. */}
        <div className="xl:w-33 w-full my-8 xl:my-10 px-1.5 xl:px-0 flex flex-col gap-2">
          <h2 className="heading2">Let’s keep in touch!</h2>
          <p className="body">
            Drop a message to say hi, or send an email to
            inclusiverealitylab[at]gmail.com, we will get back to you soon.{" "}
            <br></br> Feel free to follow our social media accounts as well.
          </p>
          <SocialMediaHandleContainer />
          <form onSubmit={handleFormSubmission} className="flex flex-col gap-2">
            {/* the fields stay grouped at the design's 24px; the 32px falls
                between the group and the button */}
            <div className="flex flex-col gap-1.5">
              <input
                type="text"
                name="contactName"
                ref={nameReference}
                placeholder="Name"
                className={FIELD}
              />
              <input
                type="email"
                name="contactEmail"
                ref={emailReference}
                placeholder="Email"
                className={FIELD}
              />
              <textarea
                name="message"
                ref={messageReference}
                placeholder="Message"
                className={`${FIELD} h-10 py-0.5`}
              />
            </div>
            {/* The fill stays black in every state; only the content swaps.
                Processing spins at 40, the checkmark sits at 32. */}
            <ButtonPrimary
              type="submit"
              label="Send"
              className="w-full flex items-center justify-center"
            >
              {status === "Sending" ? (
                <img
                  src={processing}
                  alt="Sending"
                  className="w-control h-control"
                />
              ) : status === "Sent" ? (
                <img src={check} alt="Sent" className="w-2 h-2" />
              ) : null}
            </ButtonPrimary>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default ContactModal;
