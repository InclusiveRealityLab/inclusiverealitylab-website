// Fill is 40% white rather than solid: the button sits over the landing page's
// gradient background, which is meant to show through it.
function ButtonSecondary({ label, onClick }) {
  return (
    <button
      className="label w-btnW h-control rounded-sm bg-element-white/40 text-text-primary border-1 border-element-black hover:bg-element-secondaryLight/40 transition ease-in duration-200 cursor-pointer"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default ButtonSecondary;
