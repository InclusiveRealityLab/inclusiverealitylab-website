import { formatDate } from "../utils/formatDate";

// Desktop: date in a 105px column, 16px gap, title alongside -- 42px tall.
// Mobile: date stacked above the title with an 8px gap.
// The title is the heavier of the two, not the date.
function NewsListItem({ news }) {
  return (
    <div className="flex flex-col xl:flex-row items-start gap-0.5 xl:gap-1 w-full">
      <div className="bodySmall shrink-0 xl:w-6.5">
        {news["Date"] ? formatDate(news["Date"]) : ""}
      </div>
      <div className="bodySmallBold grow">{news["Title"]}</div>
    </div>
  );
}

export default NewsListItem;
