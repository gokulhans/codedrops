import axios from 'axios';

const baseURL = import.meta.env.API_BASE_URL || 'http://localhost:5000/api';

const axiosClient = axios.create({
    baseURL: baseURL,
});

export default axiosClient;