import axios from 'axios'

export const requestRaw = (url, method, params) => {
  return axios({
    url: url,
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(params)
  });
};