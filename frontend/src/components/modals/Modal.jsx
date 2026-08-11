import closeBlack from "../../assets/icons/closeBlack.svg";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";

// The panel slides in from the right. The backdrop is not animated -- it is
// simply there for as long as the modal is mounted.
//
// Animating the exit as well as the entry means we cannot unmount the moment
// the close button is hit -- the parent renders us conditionally, so unmounting
// would cut the animation off. Instead the close is intercepted: we play the
// exit, then tell the parent to drop us once it has finished.
const DURATION = 300;

function Modal({ children, onClose, backgroundColor }) {
  const [shown, setShown] = useState(false);

  // Paint once in the closed position, then flip on the next frame so the
  // transition has a starting value to animate away from.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleClose = () => {
    setShown(false);
    setTimeout(onClose, DURATION);
  };

  return ReactDOM.createPortal(
    <>
      <div
        className="fixed top-0 right-0 w-full h-screen overflow-scroll z-100 bg-black/40"
      >
        <div
          className={`right-0 fixed w-full xl:max-w-68 h-screen transition-transform ease-in duration-300 motion-reduce:transition-none ${
            shown ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div
            className={`${backgroundColor} overflow-y-scroll flex flex-col items-center h-full`}
          >
            <div
              className={` ${backgroundColor}  xl:max-w-modal w-full absolute flex flex-row border-0 xl:justify-start justify-end items-center `}
            >
              <button
                className={` ${backgroundColor}  align    mt-2.5  mr-1.5 cursor-pointer`}
                onClick={handleClose}
              >
                <img src={closeBlack} alt="Close" />
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
