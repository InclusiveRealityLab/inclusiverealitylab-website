function ButtonSecondary({ label, onClick }) {
  return (
    <button
      className="label w-btnW h-control rounded-lg bg-background-white text-baseBlack border-1 border-baseBlack hover:bg-background-secondary/40 transition ease-in duration-200 cursor-pointer"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default ButtonSecondary;
