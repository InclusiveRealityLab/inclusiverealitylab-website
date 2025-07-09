import { Link } from "react-router";

function NavigationTab({label,linkAddress,onClick}) {
  return <button className="transition ease-in duration-200 hover:bg-background-secondary/40 w-9 h-3" onClick={onClick} ><Link to={linkAddress} >{label} </Link>

  </button>;
}

export default NavigationTab;
