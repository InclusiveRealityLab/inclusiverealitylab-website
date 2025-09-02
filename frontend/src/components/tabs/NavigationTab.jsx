import { Link } from "react-router";


function NavigationTab({ label, linkAddress, onClick }) {
  return (
    <Link to={linkAddress}>
      <button
        className="cursor-pointer transition ease-in duration-200  hover:bg-background-secondary/40 w-9 xl:w-[120px] h-2.5"
        onClick={onClick}
      >
        {label}
      </button>
    </Link>
  );
}

export default NavigationTab;
