function PublicationSectionWrapper({headingContent,children}) {
  return (
    <>
      <section className="flex flex-col bg-background-white items-start w-screen z-0">
        <div className="pageShell items-start mx-auto">
          <h1 className="heading1 min-w-0 whitespace-normal hyphens-auto" lang="en">{headingContent}</h1>

          {children}

        </div>
      </section>
    </>
  );
}

export default PublicationSectionWrapper;

