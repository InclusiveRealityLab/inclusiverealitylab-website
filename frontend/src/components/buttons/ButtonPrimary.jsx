function ButtonPrimary({ label, onClick }) {
  return (
    <button
      className="label w-btnW h-control rounded-sm bg-background-black text-baseWhite hover:text-secondaryLight transition ease-in duration-200 cursor-pointer"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default ButtonPrimary;
