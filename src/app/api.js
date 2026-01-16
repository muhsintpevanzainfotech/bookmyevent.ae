// src/app/api.js

import axios from "axios";

/**
 * Environment variables (Vite)
 */
const API_BASE_URL = import.meta.env.VITE_API;
const IMAGE_API_BASE_URL = import.meta.env.VITE_IMAGE_API;
const TIMEOUT = import.meta.env.VITE_TIMEOUT || 10000;

/**
 * Axios instance for main API
 */
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Axios instance for image uploads
 */
export const imageApi = axios.create({
  baseURL: IMAGE_API_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

/**
 * Request Interceptor (attach token)
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor (global error handling)
 */
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Server responded with status code
      console.error("API Error:", error.response.data);

      if (error.response.status === 401) {
        localStorage.removeItem("token");
        // window.location.href = "/login"; // optional
      }
    } else {
      console.error("Network Error:", error.message);
    }

    return Promise.reject(error);
  }
);

/**
 * Export base URLs (optional usage)
 */
export const API_URL = API_BASE_URL;
export const IMAGE_API_URL = IMAGE_API_BASE_URL;
