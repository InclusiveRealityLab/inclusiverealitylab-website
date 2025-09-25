import closeBlack from "../../assets/icons/closeBlack.svg";
import ReactDOM from "react-dom";

function IndividualMemberModal({onClose}) {
    return ReactDOM.createPortal(
        <> 
          <div
            className={`fixed top-0 right-0 w-full  xl:max-w-68 h-screen overflow-scroll z-100 bg-background-white `}
          >
            <div className="flex xl:max-w-68 flex-col items-center xl:gap-3 gap-[56px]">
              <button className="align xl:self-start self-end xl:ml-2.5 xl:mt-2.5 mt-1 mb-1 mr-1.5 cursor-pointer" onClick={onClose}>
                <img src={closeBlack}  />
              </button>
              <div className=" xl:w-33 w-full px-1.5 xl:px-0 flex flex-col gap-2 xl:gap-2">
               
              </div>
            </div>
          </div>
        </>,
        document.getElementById("modal-root")
      );
    
}

export default IndividualMemberModal;