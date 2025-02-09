// api/index.js
import axios from "axios";

export const prefix = "/api/v1";
export const baseurl = "http://localhost:8000";
export const url = baseurl + prefix;

const API_INSTANCE = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add response interceptor for global error handling
API_INSTANCE.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear cookies on 401
      document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "onboardingStep=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      
      window.location.href = '/auth/register';
    }
    return Promise.reject(error);
  }
);

export default API_INSTANCE;