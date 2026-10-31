import axios from "axios";
import { getSession } from "../../lib/auth";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// token automatically attach hoga
API.interceptors.request.use((config) => {
  const token = getSession()?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

export default API;