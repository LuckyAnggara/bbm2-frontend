import { baseURL } from "./helper";
import axios from "axios";

const axiosIns = axios.create({
  baseURL: baseURL,
});

axiosIns.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    config.headers.Authorization = `${token.token_type} ${token.access_token}`;
    config.headers["Content-Type"] = "application/json";
  } else {
  }
  return config;
});

export default axiosIns;
