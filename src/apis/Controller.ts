import axios from "axios";

// Correctly reference the environment variable (assuming Vite setup)
export const baseUrl = import.meta.env.BaseUrl;
console.log(baseUrl)
export const apiClient = axios.create({
  baseURL: "https://russian-roulette-game.onrender.com",
  headers: {
    'Content-Type': 'application/json',
  },
});
