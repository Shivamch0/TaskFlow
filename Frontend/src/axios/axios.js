import axios from "axios";

const api = axios.create({
  baseUrl: `${import.meta.env.VITE_API_URL}/api/v1`,
  withCredentials: true,
});

export default api