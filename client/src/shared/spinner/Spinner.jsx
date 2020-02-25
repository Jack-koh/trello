import React from "react";
import "./Spinner.scss";

function Spinner() {
  return (
    <div className="spinner-wrap">
      <div className="spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
      </div>
    </div>
  );
}

export default Spinner;
