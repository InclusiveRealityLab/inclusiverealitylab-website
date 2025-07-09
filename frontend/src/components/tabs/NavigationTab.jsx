import { Link } from "react-router";

function NavigationTab({label,linkAddress}) {
  return <div className="flex flex-row items-center justify-center transition ease-in duration-200 hover:bg-background-secondary/40 w-7 h-3" ><Link to={linkAddress} >{label} </Link>

  </div>;
}

export default NavigationTab;
