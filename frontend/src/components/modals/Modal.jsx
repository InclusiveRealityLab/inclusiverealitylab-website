import closeBlack from "../../assets/icons/closeBlack.svg";
import ReactDOM from "react-dom";

function Modal({ children, onClose, type }) {
  return ReactDOM.createPortal(
    <>
      <div className={`fixed top-0 right-0 w-full xl:max-w-68 h-screen z-100  ${type == "join" ? "bg-background-secondary" : "bg-background-tertiary"}`}>
        <div className="flex flex-col items-center gap-3"><button className="align self-start mt-2.5 ml-1.5" onClick={onClose}><img src={closeBlack}/></button>
        <div className="w-33 flex flex-col items-center ">{children}</div>
        </div>
        
      </div>
     
    </>,
    document.getElementById("modal-root")
  );
}

export default Modal;
