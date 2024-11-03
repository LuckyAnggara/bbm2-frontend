import { baseURL } from "./helper";
import axios from "axios";

const axiosIns = axios.create({
  baseURL: baseURL,
});

axiosIns.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  } else {
  }
  return config;
});

export default axiosIns;
