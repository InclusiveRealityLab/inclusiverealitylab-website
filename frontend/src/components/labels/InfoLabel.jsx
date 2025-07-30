import { infoTagStyles } from "../../constants/infoTagStyles";
function InfoLabel({label}){
    return(
        <>
        <div className={`flex items-center justify-center w-7.5 h-1.5 ${infoTagStyles[label?.toLowerCase()]} px-0.25 label`}><p>{label}</p></div>
        </>
    )
}
export default InfoLabel;