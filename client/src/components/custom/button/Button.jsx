import React from 'react';
import classNames from 'classnames';
import './Button.scss';

export const Button = ({ type, text, loading, disabled, className, onClick, children }) => {
  const content = children || text;

  return (
    <div className={classNames('custom__loading__button', { [className]: className, disabled })}>
      <button
        type={type || 'button'}
        disabled={disabled}
        onClick={() => {
          if (!loading && onClick) onClick();
        }}
      >
        {loading ? <Proccessing /> : content}
      </button>
    </div>
  );
};

export const Proccessing = () => {
  return (
    <div className="proccessing__loding__type">
      <div className="on__proccessing">
        <div className="rect__aling_1" />
        <div className="rect__aling_2" />
        <div className="rect__aling_3" />
        <div className="rect__aling_4" />
        <div className="rect__aling_5" />
      </div>
    </div>
  );
};
