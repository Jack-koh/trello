import axios from 'axios'

export const req = (url, params, method) => {
  params = params || {};
  const lowerMethod = method.toLowerCase();
  let dataType = 'params';

  if (lowerMethod === 'post' || lowerMethod === 'put') {
    dataType = 'data';
  }

  return axios({
    method: method,
    url: url,
    [dataType]: params
  });
};