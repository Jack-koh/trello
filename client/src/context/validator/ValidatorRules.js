/* eslint-disable no-useless-escape */
import axios from 'axios';
import { customValidator } from './customValidator';

const regExp = {
  number: /^\d+$/, // 숫자만
  noSpace: /\s+/, // 공백없음
  required: /^\s*$/, // 필수
  phone: /^\d{9,11}$/, // 전화번호
  withinTwenty: /^.{0,20}$/, // 20자 이내
  withinThirty: /^.{0,30}$/, // 20자 이내
  withinFifty: /^.{0,50}$/, // 50자 이내
  userName: /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]/, // 한글, 영문자만
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  ip: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  text: /([^a-zA-Z0-9-_.]|^[\d\s]*$)/,
  id: /[^a-zA-Z0-9-_]/,
};

// 룰 설정 ####################################
const extend = {
  number: {
    regExp: (value) => value.length > 0 && !value.match(regExp.number),
    message: '숫자만 입력 가능합니다.',
  },
  noSpace: {
    regExp: (value) => value.length > 0 && !!value.match(regExp.noSpace),
    message: '띄어쓰기 불가',
  },
  required: {
    regExp: (value) => !!value.match(regExp.required),
    message: 'Required information.',
  },
  phone: {
    regExp: (value) => value.length > 0 && !value.match(regExp.phone),
    message: '9~11자 이내의 숫자만 입력이 가능합니다.',
  },
  email: {
    regExp: (value) => value.length > 0 && !value.match(regExp.email),
    message: 'Please Enter a valid email.',
  },
  withinTwenty: {
    regExp: (value) => value.length > 0 && !value.match(regExp.withinTwenty),
    message: '20자 이내로 입력하세요.',
  },
  withinThirty: {
    regExp: (value) => value.length > 0 && !value.match(regExp.withinThirty),
    message: '30자 이내로 입력하세요.',
  },
  withinFifty: {
    regExp: (value) => value.length > 0 && !value.match(regExp.withinFifty),
    message: '50자 이내로 입력하세요.',
  },
  userName: {
    regExp: (value) => value.length > 0 && !!value.match(regExp.userName),
    message: '한글과 영문자(대문자, 소문자)를 사용하세요. (특수기호, 공백 사용 불가)',
  },
  ip: {
    regExp: (value) => value.length > 0 && !value.match(regExp.ip),
    message: 'IP 양식이 일치하지 않습니다.',
  },
  port: {
    regExp: (value) =>
      value.length > 0 && !(value.match(/^\d+$/) && +value >= 0 && +value <= 65535),
    message: '0 ~ 65535 까지의 숫자만 입력 가능합니다.',
  },
  text: {
    regExp: (value) => value.length > 0 && !!value.match(regExp.text),
    message: '특수문자 사용볼가(- _ .   제외)',
  },
  id: {
    regExp: (value) => !!(value.length > 20) || !!value.match(regExp.id),
    message:
      '5~20자 이내의 영문자(대문자, 소문자), 숫자, 특수문자(-, _)만 사용 가능합니다. (공백 사용 불가)',
  },
};

export const validator = (rules, value) => {
  let validError = { type: 'string', output: '' };

  rules.some((rule) => {
    if (typeof rule === 'string') {
      if (extend[rule].regExp(value)) {
        validError = { type: 'string', output: extend[rule].message };
        return true;
      }
    }

    if (typeof rule === 'object') {
      const { name, params } = rule;
      const { passwordMatch } = customValidator;

      const passwordMatchCase = () => {
        const inValid = passwordMatch.validator({ ...params, value });
        if (inValid) {
          validError = { type: 'string', output: passwordMatch.message() };
          return true;
        }
        return false;
      };

      const duplicate = () => {
        const {
          params: { url, data, errorMessage, pass },
        } = rule;
        if (!!params && Object.hasOwnProperty.call(params, 'pass')) {
          if (value === pass) return;
        }

        validError = { type: 'asyncFunc', errorMessage, output: axios.post.bind(this, url, data) };
      };

      // prettier-ignore
      switch (name) {
        case 'passwordMatch': passwordMatchCase(); break;
        case 'duplicate': duplicate(); break;
        
      }
    }

    return false;
  });

  return validError;
};
