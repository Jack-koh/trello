import axios from 'axios'

export const requestRaw = (url, method, params) => {
  return axios({
    url: `http://localhost:3000/api/${url}`,
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(params)
  });
};