import publications from "../sampleData/publications";

function PublicationsPage() {
  return (
    <>
      <div className="w-screen bg-background-white">
        <div className="border-2 border-amber-500 px-1.5 xl:px-0 flex flex-col justify-between items-start  py-5 gap-4 w-full xl:max-w-[1032px]  xl:mx-auto">
          {" "}
          <h1 className="heading1 self-start">Publications</h1>
          {console.log(
            publications
              .map((pub) => pub.year)
              .map((year) => {
                return {
                  year,
                  items: publications.filter((pub) => pub.year === year),
                };
              })
          )}
          ;
        </div>
      </div>
    </>
  );
}

export default PublicationsPage;
