import closeBlack from "../../assets/icons/closeBlack.svg";
import ReactDOM from "react-dom";

function Modal({ children, onClose,type }) {
  return ReactDOM.createPortal(
    <>
      <div className={`fixed top-0 right-0 w-full xl:max-w-67.75 h-screen z-100  ${type == "join" ? "bg-background-secondary" : "bg-background-tertiary"}`}>
        <div className="flex flex-col items-center gap-5 px-2.5 py-2.5"><button className="align self-start" onClick={onClose}><img src={closeBlack}/></button>
        <div className="w-32 flex flex-col items-center gap-2">{children}</div>
        </div>
        
      </div>
    </>,
    document.getElementById("modal-root")
  );
}

export default Modal;
