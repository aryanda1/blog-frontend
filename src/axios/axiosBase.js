import axios from "axios";
// import "dotenv/config";
const axiosService = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosService;
