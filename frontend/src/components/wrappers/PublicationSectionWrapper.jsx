function PublicationSectionWrapper({headingContent,children}) {
  return (
    <>
      <section className="flex flex-col bg-background-white xl:justify-items-start items-start w-screen ">
        <div className="flex flex-col justify-between items-start xl:items-center  py-5 gap-4  w-full xl:max-w-[1032px]  mx-auto px-1.5 xl:px-0">
          <h1 className="heading1 self-start ">{headingContent} </h1>
          {children}

        </div>
      </section>
    </>
  );
}

export default PublicationSectionWrapper;