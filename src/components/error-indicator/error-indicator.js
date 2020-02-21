import React from "react";
import "./error-indicator.css";
import icon from "./death-star.png";

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <img src={icon} alt="death star"></img>
      <span className="boom">BOOM!</span>
      <span>Something has gone terribly wrong</span>
      <span>But we already send droids to fix it!</span>
    </div>
  );
};

export default ErrorIndicator;
