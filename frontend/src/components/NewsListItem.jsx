import { formatDate } from "../utils/formatDate";

// Desktop: date in a fixed column, 16px gap, title alongside.
// Mobile: date stacked above the title.
// The date is the heavier of the two.
function NewsListItem({ news }) {
  return (
    <div className="flex flex-col xl:flex-row items-start gap-0.5 xl:gap-1 w-full">
      <div className="bodySmallBold shrink-0 xl:w-6.5">
        {news["Date"] ? formatDate(news["Date"]) : ""}
      </div>
      <div className="bodySmall grow">{news["Title"]}</div>
    </div>
  );
}

export default NewsListItem;
