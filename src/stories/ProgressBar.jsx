import "./progressBar.css";

const ProgressBar = ({ isLoading }) => {
  return isLoading ? (
    <div className="progress-bar">
      <div className="progress-bar-fill" />
    </div>
  ) : null;
};

export default ProgressBar;
