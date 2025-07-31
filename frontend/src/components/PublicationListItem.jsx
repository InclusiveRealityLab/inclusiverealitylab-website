function PublicationListItem({ publication }) {
  return (
    <div className="flex xl:flex-row-reverse flex-col justify-between items-stretch xl:w-full xl:max-w-64.5 xl:h-12.5 h-27 flex-grow basis-17 max-w-25 xl:basis-0  xl:gap-2 gap-1 border-1 border-blue-500 ">
      <img
        src="/projectPhoto.png"
        className="xl:w-20 xl:h-12.5 h-15 w-full"
      />

      {/* container for pub details */}
      <div className="flex flex-col xl:w-full w-full items-start xl:justify-between justify-between pb-0.5 xl:pt-1 xl:pb-1 xl:gap-1.5 gap-1.5">
        <div className="flex flex-col w-full items-start xl:h-6.5 h-6 xl:gap-0.5 gap-0.5 border-2 border-pink-500">
          <p className="flex bodySmall">
            {publication["venue name"] ?? "CHI2024"}
          </p>

          <p className="bodyBigBold overflow-hidden text-ellipsis line-clamp-2 ">
            {publication?.title ??
              "Cymatics Cup: Shape-Changing Drinks by Leveraging Cymatics This is longer should be clamped at the end over here. Let us write more and see the result of how this works, its still showing  "}
          </p>
        </div>

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
