import closeBlack from "../../assets/icons/closeBlack.svg";
import ReactDOM from "react-dom";

function Modal({ children, onClose, type, backgroundColor }) {
 
  return ReactDOM.createPortal(
    <> 
      <div
        className={`fixed top-0 right-0 w-full   h-screen overflow-scroll z-100 bg-black/40 `}
      >
        <div className="right-0 fixed w-full xl:max-w-68 h-screen ">
          <div className={`${backgroundColor} overflow-y-scroll flex flex-col items-center xl:gap-3 gap-[56px] h-full `}>
          <button className="align xl:self-start self-end xl:ml-2.5 xl:mt-2.5 mt-1 mb-1 mr-1.5 cursor-pointer" onClick={onClose}>
            <img src={closeBlack}  />
          </button>
          {children}
        </div>
        </div>
        
      </div>
    </>,
    document.getElementById("modal-root")
  );
}

export default Modal;
