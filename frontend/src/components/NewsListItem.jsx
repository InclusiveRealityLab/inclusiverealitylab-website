function NewsListItem({ news }) {
  return (
    <div className="flex xl:flex-row flex-col justify-between items-start pr-1 h-2.625 gap-1">
      <p className="bodySmallBold">{news?.date ?? "Dec 4, 2024"}</p>
      <p className="bodySmall line-clamp-2 ">
        {news?.content ??
          "Siggraph Asia 2024 have started at the Tokyo International Forum! Come find me at the Experience Hall as I will be chairing the XR session."}
      </p>
    </div>
  );
}
export default NewsListItem;
