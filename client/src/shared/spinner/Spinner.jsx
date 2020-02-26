import React from 'react';
import './Spinner.scss';

function Spinner() {
  return (
    <div className="spinner-wrap">
      <div className="spinner">
        <div className="rect1" />
        <div className="rect2" />
        <div className="rect3" />
        <div className="rect4" />
        <div className="rect5" />
      </div>
    </div>
  );
}

export default Spinner;
