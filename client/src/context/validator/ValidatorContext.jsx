import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
  Dispatch,
} from 'react';
import { Button } from 'components/custom';
import classNames from 'classnames';
import _ from 'shared/commonFunc';

const getErrorElements = (target) => {
  return new Promise((resolve) => {
    const getErrorList = _.debounce(() => {
      const errorList = target.getElementsByClassName('validator__error__message');
      ![...errorList].length ? resolve(true) : console.log('Exist validation error');
    }, 0);

    getErrorList();
  });
};

// Validator Context ###############################################
export const ValidatorContext = createContext({
  excute: false,
  setExcute: () => false,
  loading: false,
  setLoading: () => false,
});

// Validator Provier ###############################################

export const ValidatorProvider = ({ onSubmit, form, children }) => {
  const [excute, setExcute] = useState(false);
  const [loading, setLoading] = useState(false);
  const validatorRef = useRef(null);

  const submitHandler = useCallback(
    (target) => getErrorElements(target).then((result) => result && onSubmit()),
    [onSubmit]
  );

  useEffect(() => {
    if (excute) {
      submitHandler(validatorRef.current);
      setExcute(false);
    }
  }, [excute]);

  return (
    <ValidatorContext.Provider value={{ excute, setExcute, loading, setLoading }}>
      {form ? (
        <form
          ref={validatorRef}
          className="validator__form"
          onSubmit={(e) => {
            e.preventDefault();
            setExcute(true);
          }}
        >
          {children}
        </form>
      ) : (
        <div ref={validatorRef} className="validator__form">
          {children}
        </div>
      )}
    </ValidatorContext.Provider>
  );
};

// Validator Submit ###############################################
export const ValidatorSubmit = ({ loading, form, text, className, disabled }) => {
  const validatorContext = useContext(ValidatorContext);
  const { setExcute, loading: asyncValidating } = validatorContext;

  return (
    <Button
      className={classNames('validator__button', { [className]: className })}
      type="submit"
      text={text}
      loading={loading}
      disabled={disabled}
      onClick={() => {
        if (!asyncValidating && !form) setExcute(true);
      }}
    />
  );
};
