import React from 'react';
import './Button.scss';

export function Button({ type, text, loading, className, disabled }) {
  return (
    <button className={className} type={type} disabled={disabled}>
      {loading && (
        <div className="loading__wrapper">
          <div className="loading">
            <div className="rect1" />
            <div className="rect2" />
            <div className="rect3" />
            <div className="rect4" />
            <div className="rect5" />
          </div>
        </div>
      )}
      <span className={loading ? 'hide' : ''}>{text}</span>
    </button>
  );
}
