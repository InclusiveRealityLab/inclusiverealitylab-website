function ButtonPrimary({ label, onClick }) {
  return (
    <>
      <button className="w-btnW h-control p-0.5 border-1 border-background-black bg-baseWhite xl:bg-background-black text-baseBlack xl:text-baseWhite hover:text-text-active cursor-pointer" onClick={onClick}>
        {label}
      </button>
    </>
  );
}

export default ButtonPrimary;
