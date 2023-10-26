import axios from 'axios';

const baseURL = import.meta.env.API_BASE_URL;

const axiosClient = axios.create({
    baseURL: baseURL,
});

export default axiosClient;