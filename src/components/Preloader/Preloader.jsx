import "./Preloader.css";

function Preloader({ text }) {
  return (
    <div className="preloader">
      <div className="preloader__spinner">
        <div className="circle-preloader" />
      </div>
      {text && <p className="preloader__text">{text}</p>}
    </div>
  );
}

export default Preloader;
