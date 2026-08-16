// Desktop: 256x160 cover flush right, 160px content block, 24px padding.
// Mobile: 5:3 cover on top, 168px content block, 16px padding.
// The content block is a fixed height either way, so items line up whether or
// not a publication has a cover.
function PublicationListItem({ publication }) {
  if (!publication) return null;

  const cover = publication["Cover"];

  const linkClass =
    "label w-6.5 h-2.5 rounded-sm border-1 border-element-black flex items-center justify-center transition ease-in duration-200 hover:bg-element-secondaryLight/40";

  return (
    <div className="flex flex-col xl:flex-row-reverse w-full max-w-25 xl:max-w-content rounded-lg border-1 border-element-black bg-element-white overflow-hidden">
      {cover && (
        <img
          src={`${import.meta.env.BASE_URL}images/works/${cover}`}
          alt=""
          className="w-full aspect-[5/3] xl:aspect-auto xl:w-16 xl:h-10 object-cover shrink-0"
        />
      )}

      <div className="flex flex-col justify-between grow h-10.5 xl:h-10 p-1 xl:p-1.5">
        <div className="flex flex-col gap-0.5">
          <p className="bodySmall">{publication["Venue Name"]}</p>
          {/* one line on desktop, two on mobile -- the block height is fixed,
              so an unclamped title would push the buttons out of the card */}
          <p className="bodyBold line-clamp-2 xl:line-clamp-1">
            {publication["Title"]}
          </p>
        </div>

        <div className="flex flex-row gap-1 xl:gap-1.5">
          {publication["DOI"] && (
            <a
              href={publication["DOI"]}
              className={linkClass}
              target="_blank"
              rel="noopener noreferrer"
            >
              DOI
            </a>
          )}
          {publication["PDF"] && (
            <a
              href={publication["PDF"]}
              className={linkClass}
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
