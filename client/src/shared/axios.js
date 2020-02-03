import axios from "axios";

const baseUrl = "http://localhost:3000/api/";

export const requestRaw = (url, method, params) => {
  let dataSet = "data";
  if (method === "GET") dataSet = "params";
  return axios({
    url: baseUrl + url,
    method: method,
    [dataSet]: params
  });
};
