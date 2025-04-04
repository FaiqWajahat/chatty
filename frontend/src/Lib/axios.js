import axios from "axios";

const axiosInsatnce=axios.create(
    {
        baseURL:import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api",
        withCredentials:true
    }
)

export default axiosInsatnce;