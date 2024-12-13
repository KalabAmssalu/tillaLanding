import type { AxiosInstance } from "axios";
import axios from "axios";

import { get_session } from "./auth/action";

axios.defaults.withCredentials = true;

const axiosInstance: AxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	timeout: 20000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Helper function to extract the domain from the Set-Cookie header

// Add a request interceptor to handle session-based subdomains
axiosInstance.interceptors.request.use(
	async (config) => {
		// Handle session authorization
		if (
			!config.url?.includes("auth/login/") &&
			!config.url?.includes("member/register") &&
			!config.url?.includes("auth/signup/") &&
			!config.url?.includes("auth/forgot-password/")
		) {
			const session = await get_session();
			const sessionId = session?.sessionId;

			if (sessionId) {
				config.headers.Authorization = `Session ${sessionId}`;
			}

			// Extract subdomain from the session response cookies
			const setCookie = session?.response?.headers["set-cookie"]; // Assuming the session response includes the headers
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;
