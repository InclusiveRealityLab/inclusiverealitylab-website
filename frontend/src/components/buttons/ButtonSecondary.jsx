// Fill is 40% white rather than solid: the button sits over the landing page's
// gradient background, which is meant to show through it.
function ButtonSecondary({ label, onClick }) {
  return (
    <button
      className="label w-btnW h-control rounded-lg bg-background-white/40 text-baseBlack border-1 border-baseBlack hover:bg-background-secondary/40 transition ease-in duration-200 cursor-pointer"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default ButtonSecondary;
