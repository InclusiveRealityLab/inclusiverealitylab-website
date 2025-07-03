import PublicationListItem from "./PublicationListItem";

function PublicationsContainer({ publications }) {
  return (
    <>
      {" "}
      {/* <section className="flex flex-col bg-background-white xl:justify-items-start items-start w-screen px-1.5"> */}
      {/* <div className="flex flex-col justify-between items-start xl:items-center  py-5 gap-4  w-full xl:max-w-[1032px]  mx-auto"> */}
        {/* <h1 className="heading1 self-start">Recent publications</h1> */}

        <div className="xl:flex xl:flex-col xl:items-start xl:gap-2 grid gap-x-1.5 gap-y-2.5 w-full grid-cols-[repeat(auto-fit,minmax(272px,1fr))] ">
          {publications &&
            publications.map((pub) => (
              <PublicationListItem key={pub.id} publication={pub} />
            ))}
            {/* <PublicationListItem/>
            <PublicationListItem/>
            <PublicationListItem/> */}
        </div>

        {/* <p className="labelBold self-end">view all publications</p>
      </div> */}
      {/* </section> */}
    </>
  );
}

export default PublicationsContainer;