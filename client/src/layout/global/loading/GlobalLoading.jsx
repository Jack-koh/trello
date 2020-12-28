import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './GlobalLoading.scss';

function GlobalLoading() {
  const loading = useSelector((state) => state.loading.progress);
  return (
    <Link to="/main/board">
      {loading ? (
        <div className="logo-animation-wrapper">
          <div className="logo-animation">
            <div className="animation-bar-left" />
            <div className="middle-bar" />
            <div className="animation-bar-right" />
          </div>
          <div className="text-logo" />
        </div>
      ) : (
        <div className="logo" />
      )}
    </Link>
  );
}

export default GlobalLoading;
