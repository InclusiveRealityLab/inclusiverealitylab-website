function PublicationSectionWrapper({headingContent,children}) {
  return (
    <>
      {/* transparent so the landing page's fixed background shows through;
          on the other pages the ground is white anyway */}
      <section className="flex flex-col items-start w-screen z-0">
        <div className="pageShell items-start mx-auto">
          {/* optional: the updated landing page drops both section headings */}
          {headingContent && (
            <h1 className="heading1 min-w-0 whitespace-normal hyphens-auto" lang="en">{headingContent}</h1>
          )}

          {children}

        </div>
      </section>
    </>
  );
}

export default PublicationSectionWrapper;

