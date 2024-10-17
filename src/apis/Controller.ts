import axios from "axios";

// Correctly reference the environment variable (assuming Vite setup)
export const baseUrl = import.meta.env.VITE_BASE_URL;

export const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
