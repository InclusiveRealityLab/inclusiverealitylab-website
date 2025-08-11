import loading from "../assets/icons/loading.svg";

function LoadingSpinner() {
  return (
    <>
      {" "}
      <img src={loading} className="w-2.5 h-2.5" alt="loading..." />
    </>
  );
}

export default LoadingSpinner;
