import React, { useState, useEffect, useRef } from 'react';
import './Elements.scss';
import './BtnLoading.scss';

export function Button({ type, text, loading, className, disabled }) {
  return (
    <button className={className} type={type} disabled={disabled}>
      {loading && (
        <div className="btnLoading_wrap">
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

export function Textarea({
  type,
  value,
  placeholder,
  autoFocus,
  className,
  onChange,
  onBlur,
  disabled,
}) {
  return (
    <textarea
      type={type}
      className={className}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      autoFocus={autoFocus}
      spellCheck="false"
      disabled={disabled}
    />
  );
}

export function PopContainer({ children }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        cursor: 'pointer',
      }}
    >
      {children}
    </div>
  );
}

export function Popover({ className, children, clickOutside, close }) {
  const wrapperRef = useRef(null);
  useEffect(() => {
    const clickOutsideHandler = (e) => {
      if (clickOutside) {
        if (wrapperRef.current.parentNode.contains(e.target)) return;
        close();
      }
    };

    document.addEventListener('click', clickOutsideHandler, true);
    return () => document.removeEventListener('click', clickOutsideHandler, true);
  }, [clickOutside, close]);
  return (
    <div ref={wrapperRef} className={`popover ${className}`}>
      {children}
    </div>
  );
}

export function ClickOutside({ className, children, close }) {
  const wrapperRef = useRef(null);
  useEffect(() => {
    const clickOutsideHandler = (e) => {
      console.log(wrapperRef.current);
      if (wrapperRef.current.contains(e.target)) return;
      close();
    };

    document.addEventListener('click', clickOutsideHandler, true);
    return () => document.removeEventListener('click', clickOutsideHandler, true);
  }, [close]);
  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
}

export function Modal({ content, children, open, closeOutside }) {
  useEffect(() => {
    if (closeOutside) {
      const clickOutsideHandler = (e) => {
        if (e.target.className === 'custom-modal') closeOutside();
      };
      document.addEventListener('click', clickOutsideHandler, true);
      return () => document.removeEventListener('click', clickOutsideHandler, true);
    }
  }, [closeOutside]);

  return (
    <>
      {children}
      {open && (
        <>
          <div className="custom-modal">{content}</div>
          <div className="back_drop" />
        </>
      )}
    </>
  );
}
