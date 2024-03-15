import { getAuthToken } from '@/utils/auth';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_CARBON_MVP_URL;
const axiosInstance = axios.create({
	baseURL,
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = getAuthToken();
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response) {
			console.log(error.response);
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
