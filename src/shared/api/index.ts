import axios from 'axios';

export const createInstance = () => {
	let baseURL = "http://localhost:4444";

	const instance = axios.create({
		baseURL,
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('token') || ""}`
		},
	});

	instance.interceptors.request.use(
		async (config) => {
			console.log('[Interceptor Request]:', config.method, config.url);
			return config;
		},
		(error) => {
			console.log('[Interceptor Request Error]:', error);
			return Promise.reject(error);
		}
	);

	instance.interceptors.response.use(
		async (response) => {
			console.log('[Interceptor Response Success]:', response.config.url, response.status);
			return response;
		},
		(error) => {
			console.log('[Interceptor Response Error]:', error.config?.url, error.response?.status);
			console.log('[Interceptor Response Error] Error details:', error.response?.data);
			return Promise.reject(error);
		}
	);

	return instance;
};

export const baseInstance = createInstance();