import { baseURL } from "./helper";
import axios from "axios";

const axiosFile = axios.create({
  baseURL: baseURL,
});

axiosFile.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    config.headers.Authorization = `${token.token_type} ${token.access_token}`;
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
  }
  return config;
});

export default axiosFile;
