const passwordMatch = {
  validator: (params) => {
    const { value, matchValue } = params;
    if (matchValue.length) {
      if (value !== matchValue) return true;
    } else if (value.length && value !== matchValue) return true;
    return false;
  },
  message: () => '입력한 비밀번호와 재입력한 비밀번호가 일치하지 않습니다.',
};

export const customValidator = { passwordMatch };
