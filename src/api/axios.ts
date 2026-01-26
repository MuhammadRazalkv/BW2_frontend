import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/pdf`,
  withCredentials: true,
});

// axiosInstance.interceptors.request.use(
// 	(config) => {
// 		const token = store.getState().auth.token;
// 		if (token) {
// 			config.headers.Authorization = `Bearer ${token}`;
// 		}
// 		return config;
// 	},
// 	(error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
// 	(response) => response,
// 	async (error) => {
// 		const originalRequest = error.config;
// 		const skipUrls = ['/login', '/register', '/verify-email', '/refresh'];
// 		if (
// 			error.response?.status === 401 &&
// 			!originalRequest._retry &&
// 			!skipUrls.some((url) => originalRequest.url?.includes(url))
// 		) {
// 			originalRequest._retry = true;
// 			try {
// 				const { data } = await axiosInstance.post('/refresh');
// 				const dispatch = store.dispatch;
// 				dispatch(loginDispatch({ token: data.accessToken }));
// 				originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
// 				return axiosInstance(originalRequest);
// 			} catch (err) {
// 				window.location.href = '/login';
// 			}
// 		}
// 		return Promise.reject(error);
// 	}
// );

export default axiosInstance;
