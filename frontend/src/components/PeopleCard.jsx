function PeopleCard({ person }) {
  const isActive = ["lab","collaborator"].includes(person.category);
  return (
    <>
      <div
        className={`flex flex-col items-center gap-1 border-2 
        xl:w-15  w-9.5 
        ${isActive ? "xl:h-22.5 h-20 " : "xl:h-6 h-6"}
      `}
      >
        {isActive && (
          <div className="xl:w-15 xl:h-15 w-9.5 h-9.5">
            <img
              src="../profilePhoto.jpg"
              alt="Profile"
              className=" rounded-full object-cover grayscale hover:grayscale-0"
            />
          </div>
        )}
        <div className="flex flex-col justify-between items-center heading4 w-full gap-0.5 xl:min-h-[85px] border-2 border-blue-500">
          <div className="flex flex-col justify-between  items-center heading4 ">
            <p>{person?.givenName}</p>
            <p>{person?.familyName.toUpperCase()}</p>
          </div>
          <p className="bodySmall">{person?.role}</p>
        </div>
      </div>
    </>
  );
}

export default PeopleCard;
