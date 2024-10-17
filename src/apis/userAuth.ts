/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "./Controller";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userAuth = async (data: any) => {
  try {
    const response = await apiClient.post('/telegram-auth/', data); // Change to actual endpoint
    return response;
  } catch (error: any) {
    console.error("Error in userAuth:", error); // Log the error for debugging
    throw new Error(error.response ? error.response.data : error.message); // More informative error message
  }
};
