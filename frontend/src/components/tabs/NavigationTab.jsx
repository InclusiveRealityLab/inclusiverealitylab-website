import { Link } from "react-router";

function NavigationTab({ label, linkAddress, onClick }) {
  return (
    <Link to={linkAddress}>
      <button
        className="label w-9 xl:w-7.5 h-control rounded-sm cursor-pointer hover:bg-element-secondaryLight/40 transition ease-in duration-200"
        onClick={onClick}
      >
        {label}
      </button>
    </Link>
  );
}

export default NavigationTab;
