import React from 'react';
import classNames from 'classnames';
import './TextArea.scss';

export const TextArea = ({
  value,
  placeholder,
  className,
  onChange,
  onBlur,
  disabled,
  innerRef,
  textHeight,
}) => {
  const onChangeHandler = (e) => {
    onChange(e);
    // 스크롤 높이값만큼 오브젝트 높이를 맞춰준다.
    e.target.style.cssText = `${textHeight}:28px`;
    e.target.style.cssText = `height: ${e.target.scrollHeight}px`;
  };

  return (
    <textarea
      className={classNames('auto__size__textarea', { [className]: className })}
      ref={innerRef}
      type="text"
      value={value}
      disabled={disabled}
      onChange={onChangeHandler}
      onBlur={onBlur}
      placeholder={placeholder}
      spellCheck="false"
    />
  );
};
