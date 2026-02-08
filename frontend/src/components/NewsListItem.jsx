import { formatDate } from "../utils/formatDate";

function NewsListItem({ news }) {
  return (
    <div className="flex xl:flex-row flex-col  items-start pr-1 xl:pr-0 h-2.625 gap-1">
      
      <div className="flex xl:w-[105px] bodySmallBold">
        {news["Date"] ? formatDate(news["Date"]) : "Dec 4, 2024"}
        {/* {console.log(`received date string: ${news["Date"]},  formatted : ${formatDate(news["Date"])}`)} */}
      </div>
      <div className="flex bodySmall  xl:w-[878px] xl:mr-1 ">
        {news["Title"] ??
          "Siggraph Asia 2024 have started at the Tokyo International Forum! Come find me at the Experience Hall as I will be chairing the XR session."}
      </div>
    </div>
  );
}
export default NewsListItem;
