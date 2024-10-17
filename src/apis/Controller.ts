import axios from "axios";

export const baseUrl = import.meta.env.BaseUrl
export const apiClient = axios.create({
    baseURL:baseUrl,
    headers:{
        'Content-Type':'application/json'
    }
})

