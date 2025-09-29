import closeBlack from "../../assets/icons/closeBlack.svg";
import ReactDOM from "react-dom";

function Modal({ children, onClose, type, backgroundColor }) {
 
  return ReactDOM.createPortal(
    <> 
      <div
        className={`fixed top-0 right-0 w-full   h-screen overflow-scroll z-100 bg-black/40 `}
      >
        <div className="right-0 fixed w-full xl:max-w-64.5 h-screen ">
          <div className="bg-white flex flex-col items-center xl:gap-3 gap-[56px] h-full ">
          <button className="align xl:self-start self-end xl:ml-2.5 xl:mt-2.5 mt-1 mb-1 mr-1.5 cursor-pointer" onClick={onClose}>
            <img src={closeBlack}  />
          </button>
          <div className=" xl:w-33 w-full px-1.5 xl:px-0 flex flex-col gap-2 xl:gap-2">
            {children}
          </div>
        </div>
        </div>
        
      </div>
    </>,
    document.getElementById("modal-root")
  );
}

export default Modal;
