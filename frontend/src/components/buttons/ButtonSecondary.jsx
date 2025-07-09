function ButtonSecondary({ label, onClick }) {
  return (
    <>
      <button
        className="w-[144px] h-[40px] p-0.5 border-1 text-baseWhite  xl:text-baseBlack border-white xl:border-baseBlack transition ease-in duration-200 hover:bg-background-secondary/40 "
        onClick={onClick}
      >
        {label}
      </button>
    </>
  );
}

export default ButtonSecondary;
