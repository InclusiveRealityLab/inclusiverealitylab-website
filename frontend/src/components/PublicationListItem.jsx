function PublicationListItem({ publication }) {
  return (
    <div className="flex xl:flex-row-reverse flex-col justify-between items-stretch xl:w-full xl:max-w-64.5 xl:h-12.5 flex-grow basis-17 max-w-25  gap-1 ">
      <img
        src="/projectPhoto.png"
        className="xl:w-20 xl:h-12.5 w-full h-full "
      />

      {/* container for pub details */}
      <div className="flex flex-col items-start pb-0.5 xl:pt-1 xl:pr-1 xl:gap-0.5  ">
        <p className="flex bodySmall mb-0.5">
          {publication?.conference ?? "CHI2024"}
        </p>

        <p className="bodyBigBold overflow-hidden text-ellipsis line-clamp-2  xl:mb-1 mb-1.5">
          {publication?.title ??
            "Cymatics Cup: Shape-Changing Drinks by Leveraging Cymatics This is longer should be clamped at the end over here. Let us write more and see the result of how this works, its still showing  "}
        </p>

        {/* container for the CTA buttons : DOI and PDF links */}
        <div className="flex flex-row w-auto justify-center gap-1.5 ">
          {/* these will become separate components soon */}
          <button className="label border-1 h-2.5 w-6.5 ">DOI</button>
          <button className="label border-1 h-2.5 w-6.5 ">PDF</button>
        </div>
      </div>
    </div>
  );
}

export default PublicationListItem;
