function PublicationListItem({ publication }) {
  return (
    <div className={`flex xl:flex-row-reverse flex-col justify-between items-stretch xl:w-full xl:max-w-64.5 xl:h-12.5 ${publication["Cover"] ? `h-27` : `h-[176px]`} flex-grow basis-17 max-w-25 xl:basis-0  xl:gap-2 gap-1  `}>
      {publication["Cover"] && (<img src={`${import.meta.env.BASE_URL}images/works/${publication["Cover"]}` } className="xl:w-20 xl:h-12.5 h-15 w-full" />)}

      {/* container for pub details */}
      <div className="flex flex-col xl:w-full w-full items-start xl:justify-between justify-between pb-0.5 xl:pt-1 xl:pb-1 xl:gap-1.5 gap-1.5">
        <div className="flex flex-col w-full items-start xl:h-6.5 h-6 xl:gap-0.5 gap-0.5 ">
          <p className="flex bodySmall">
            {publication["Venue Name"] ?? "CHI2024"}
          </p>

          <p className="bodyBigBold overflow-hidden text-ellipsis line-clamp-2 ">
            {publication["Title"] ??
              "Cymatics Cup: Shape-Changing Drinks by Leveraging Cymatics This is longer should be clamped at the end over here. Let us write more and see the result of how this works, its still showing  "}
          </p>
        </div>

        {/* container for the CTA buttons : DOI and PDF links */}
        <div className="flex flex-row w-auto justify-center gap-1.5 ">
          {/* these will become separate components soon */}
          {publication["DOI"] && (
            <a
              href={publication["DOI"]}
              className="label border-1 h-2.5 w-6.5 flex items-center justify-center transition ease-in duration-200 hover:bg-background-secondary/40 "
              target="_blank"
              rel="noopener noreferrer"
            >
              DOI
            </a>
          )}
          {publication["PDF"] && (
            <a
              href={publication["PDF"]}
              className="label border-1 h-2.5 w-6.5 flex items-center justify-center transition ease-in duration-200 hover:bg-background-secondary/40 "
              target="_blank"
              rel="noopener noreferrer"
            >
              PDF
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default PublicationListItem;
