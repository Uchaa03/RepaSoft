import axios from "axios";

//Create axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
})

export default api;