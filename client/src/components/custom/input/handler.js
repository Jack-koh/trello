export const duplicateCheck = async (args, setError, errorMessage) => {
  const { output, error } = args;
  try {
    const response = await output();
    const { list } = response.data;
    if (list && list.length > 0) {
      if (list[0].isOk === 0) setError(errorMessage || '중복된 값이 있습니다.');
      if (list[0].isOk === 1 && error) setError('');
    }
  } catch (err) {
    console.log(err);
  }
};
export const submitExcutor = (props) => {
  const { setError, validator } = props;
  const validError = validator();
  const { type, output } = validError;
  const immedType = type === 'string' || type === 'stringArray';
  if (immedType && output) setError(output);
};

export const realTimeExcutor = (props) => {
  const { error, setError, validator } = props;
  const validError = validator();
  const { type, output } = validError;
  const immedType = type === 'string' || type === 'stringArray';

  if (immedType) {
    return {
      type: 'immediately',
      func: () => setError(output),
    };
  }

  return {
    type: 'debounce',
    func: () => duplicateCheck({ output: output, error }, setError, validError.errorMessage),
  };
};

export const blurExcutor = (props) => {
  const { setError, validator } = props;
  const validError = validator();
  const { type, output } = validError;
  const immedType = type === 'string' || type === 'stringArray';
  if (immedType) setError(output);
};
