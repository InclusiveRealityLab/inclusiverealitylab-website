function PublicationSectionWrapper({headingContent,children}) {
  return (
    <>
      <section className="flex flex-col bg-background-white items-start w-screen z-0">
        <div className="flex flex-col justify-between items-start   py-5 gap-4  w-full xl:max-w-content  mx-auto px-1.5 xl:px-0">
          <h1 className="heading1 min-w-0 whitespace-normal hyphens-auto" lang="en">{headingContent}</h1>

          {children}

        </div>
      </section>
    </>
  );
}

export default PublicationSectionWrapper;

