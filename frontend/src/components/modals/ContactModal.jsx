import Modal from "./Modal";
import SocialMediaHandleContainer from "../SocialMediaHandleContainer";
import check from "../../assets/icons/check.svg";
import processing from "../../assets/icons/processing.svg";
import { useRef, useState } from "react";

const POST_API = import.meta.env.VITE_API_POST_BASE_URL;

function ContactModal({ children, onClose, backgroundColor, horizontalGap }) {
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
        setStatus("Failed.");
      }
    } catch (error) {
      console.error("❌ Fetch error:", error);
      setStatus("Failed");
      // this alerts the user about an error processing the message and closes the modal
      alert("Sorry there was an error sending your message, try again later");
      setIsModalOpenContact(false);
    }
  };
  return (
    <>
      <Modal onClose={onClose} backgroundColor="bg-background-tertiary" horizontalGap={horizontalGap}>
        <div className=" xl:w-33 w-full my-[160px] px-1.5 xl:px-0 flex flex-col gap-2 xl:gap-2">
          <div className=" xl:w-33 w-full px-1.5 xl:px-0 flex flex-col gap-2 xl:gap-2">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 ">
                <h1 className="heading1">Let's keep in touch!</h1>
                <p className="body">
                  Drop a message to say hi, or send an email to
                  inclusiverealitylab[at]gmail.com, we will get back to you
                  soon. <br></br> Feel free to follow our social media accounts
                  as well.
                </p>
                <SocialMediaHandleContainer iconColor="blk" />
              </div>
              <form
                onSubmit={handleFormSubmission}
                className="flex flex-col items-center justify-between gap-1.5"
              >
                <input
                  type="text"
                  name="contactName"
                  ref={nameReference}
                  placeholder="Name"
                  className="bg-background-white w-full h-2.5 border-1 border-black px-1 body"
                />
                <input
                  type="email"
                  name="contactEmail"
                  ref={emailReference}
                  placeholder="Email"
                  className="bg-background-white w-full h-2.5 border-1 border-black px-1 body"
                />
                <textarea
                  type="text"
                  name="message"
                  ref={messageReference}
                  placeholder="Message"
                  className="bg-background-white w-full h-10 border-1 border-black px-1 py-0.5 body"
                />
                <button
                  className={`label text-white text-center  ${
                    status == "Sent"
                      ? "bg-background-secondary py-[4px] px-3.5"
                      : "bg-background-black py-[4px] "
                  } bg-background-black w-full h-2.5 hover:text-secondary`}
                  type="submit"
                >
                  {status === "Sending" ? (
                    <span className="flex items-center justify-center">
                      <img
                        src={processing}
                        alt="processing"
                        className="w-2 h-2"
                      />
                    </span>
                  ) : status === "Sent" ? (
                    <span className="flex items-center justify-center">
                      <img src={check} alt="checkmark" className="w-2 h-2" />
                    </span>
                  ) : (
                    "Send"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ContactModal;
