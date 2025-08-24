import { Link } from "react-router";

function NavigationTab({label,linkAddress,onClick}) {
  return <button className="transition ease-in duration-200 hover:bg-background-secondary/40 w-9 xl:w-[120px] h-2.5" onClick={onClick} ><Link to={linkAddress} >{label} </Link>

  </button>;
}

export default NavigationTab;
