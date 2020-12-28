/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { validation, T_ValidationRules } from 'context';
import { submitExcutor, blurExcutor, realTimeExcutor } from './handler';
import './Input.scss';

export const Input = ({
  type,
  value,
  placeholder,
  className,
  innerRef,
  readOnly,
  disabled,
  rules,
  validType,
  onChange,
  onBlur,
  onFocus,
  onKeyEnter,
  error: errorProps,
  clearError,
}) => {
  const { ValidatorContext, validator } = validation;
  const validatorContext = useContext(ValidatorContext);
  const isFirstRun = useRef(true);
  const wrapperRef = useRef(null);
  let inputElement = null;
  const wrapperEl = wrapperRef.current?.getElementsByClassName('custom__input');
  if (wrapperEl) {
    inputElement = [...wrapperEl][0];
    if (value) inputElement.value = value.toString();
  }
  const inputValue = inputElement ? inputElement.value : '';
  const [error, setError] = useState('');
  const [lineHeight, setLineHeight] = useState();
  const { excute } = validatorContext;

  const keyPressHandler = (e) => {
    if (e.key === 'Enter' && onKeyEnter) onKeyEnter();
  };

  // SUBMIT VALID EFFECT #############################################
  useEffect(() => {
    if (excute && rules && !disabled)
      blurExcutor({ setError, validator: () => validator.apply(this, [rules, inputValue]) });
  }, [excute]);

  // REAL TIME VALID EFFECT #############################################
  useEffect(() => {
    let timer;
    if (!isFirstRun.current && rules && !disabled) {
      if (validType === 'realtime') {
        const getBounceType = realTimeExcutor({
          error,
          setError,
          validator: () => validator.apply(this, [rules, inputValue]),
        });
        const { type, func } = getBounceType;
        if (type === 'immediately') func();
        if (type === 'debounce') timer = setTimeout(() => func(), 300);
      }
      if (validType !== 'realtime' && !excute && error) setError(''); // 리얼타임이 아닐시 에러가 없으면 error 초기화
    }

    if (isFirstRun.current) isFirstRun.current = false;
    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    if (errorProps) setError(errorProps);
    if (error && !errorProps) setError('');
  }, [errorProps]);

  useEffect(() => {
    if (clearError) {
      const { value, listener, condition } = clearError;
      const conditionCheck = condition !== undefined && value === listener;
      if (typeof value === 'string') {
        if (conditionCheck) {
          if (condition) setError('');
        } else if (value === listener) setError('');
      }

      if (typeof value === 'object') {
        value.some((val) => {
          const withCondition = () => {
            if (condition) {
              setError('');
              return true;
            }
            return false;
          };

          const withOutCondition = () => {
            if (val === listener) {
              setError('');
              return true;
            }
            return false;
          };

          // prettier-ignore
          switch(conditionCheck) {
            case true: withCondition(); break;
            case false: withOutCondition(); break;
          }

          return false;
        });
      }
    }
  }, [clearError]);

  // INPUT 자동 높이값 지정
  useEffect(() => {
    if (wrapperRef.current) {
      const { clientHeight } = wrapperRef.current;
      setLineHeight({ height: `${clientHeight}px`, lineHeight: `${clientHeight}px` });
    }
  }, [wrapperRef]);

  // 비활성화시 valid error 리셋
  useEffect(() => {
    if (disabled) setError('');
  }, [disabled]);

  return (
    <div
      ref={wrapperRef}
      className={classNames('custom__input__wrapper', { [className]: className })}
    >
      <input
        className={classNames('custom__input', { disabled, error })}
        type={type}
        ref={innerRef}
        value={value}
        onChange={onChange}
        placeholder={placeholder === null ? undefined : placeholder}
        spellCheck="false"
        readOnly={readOnly}
        disabled={disabled}
        style={lineHeight}
        onKeyPress={(e) => keyPressHandler(e)}
        onFocus={() => {
          if (onFocus) onFocus();
        }}
        onBlur={(e) => {
          if (onBlur) onBlur();
          if (validType === 'blur' && rules && !disabled)
            submitExcutor({
              setError,
              validator: () => validator.apply(this, [rules, e.target.value]),
            });
        }}
      />
      <Error error={error} wrapper={wrapperRef.current} />
    </div>
  );
};

const Error = ({ error, wrapper }) => {
  if (!error) return <></>;
  const errorTop = wrapper ? wrapper.clientHeight + 3 : 0;

  return (
    <div className="validator__error__message" style={{ top: errorTop }}>
      {typeof error === 'string'
        ? error
        : error.map((item, index) => <div key={index}>{item}</div>)}
    </div>
  );
};
