import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
      data-testid="loader"
    >
      <TailSpin height="120" width="120" color="black" ariaLabel="tail-spin-loading" wrapperStyle={{ paddingTop: 200 }} />
    </div>
  );
};

export default Loader;
