// The contact form's Send button is this same object -- black fill, white
// label, label turning the secondary light tint on hover -- so it comes through here
// rather than being hand-rolled. It only differs in stretching full width and
// swapping its label for a status icon, which is what className and children
// are for.
function ButtonPrimary({ label, onClick, type = "button", className = "", children }) {
  return (
    <button
      type={type}
      className={`label w-btnW h-control rounded-sm bg-element-black text-text-white hover:text-element-secondaryLight transition ease-in duration-200 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children ?? label}
    </button>
  );
}

export default ButtonPrimary;
