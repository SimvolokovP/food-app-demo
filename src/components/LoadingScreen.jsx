import spin from "../assets/spin.png";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <img src={spin} alt="spin" />
    </div>
  );
};

export default LoadingScreen;
