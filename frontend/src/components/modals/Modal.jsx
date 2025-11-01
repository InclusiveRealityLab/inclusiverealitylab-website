import closeBlack from "../../assets/icons/closeBlack.svg";
import ReactDOM from "react-dom";

function Modal({ children, onClose, type, backgroundColor, horizontalGap }) {
  return ReactDOM.createPortal(
    <>
      <div
        className={`fixed top-0 right-0 w-full   h-screen overflow-scroll z-100 bg-black/40 `}
      >
        <div className="right-0 fixed w-full xl:max-w-68 h-screen ">
          <div
            className={`${backgroundColor} overflow-y-scroll flex flex-col items-center xl:gap-${horizontalGap} h-full `}
          >
            <div
              className={` ${backgroundColor}  xl:max-w-[1008px] w-full absolute flex flex-row border-0 xl:justify-start justify-end items-center `}
            >
              <button
                className={` ${backgroundColor}  align    mt-2.5  mr-1.5 cursor-pointer border-2 border-amber-400`}
                onClick={onClose}
              >
                <img src={closeBlack} />
              </button>
            </div>

            {children}
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal-root")
  );
}

export default Modal;
