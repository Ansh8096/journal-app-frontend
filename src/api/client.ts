import axios from "axios"
import storage from "@/utils/storage";
import { STORAGE_KEYS } from "@/constants/storage";
import { handleResponse, handleResponseError } from "./responseInterceptor";

const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000, // "Wait at most 10 seconds for the server.", If the backend doesn't respond within 10 seconds:
    headers: {
        Accept: "application/json",
    },
    withCredentials: true,
});

client.interceptors.request.use(
    (config) => {
        const token = storage.get<string>(
            STORAGE_KEYS.ACCESS_TOKEN
        );

        if(token) config.headers.set("Authorization", `Bearer ${token}`);

        return config;
    },

    (error) => Promise.reject(error)
);


client.interceptors.response.use(
    handleResponse, // handling the response...
    
    // handling error...
    (error) => {

        // means the jwt is expired...
        if (error.response?.status === 401) {

            storage.remove(STORAGE_KEYS.ACCESS_TOKEN);

            // TODO: AuthContext will handle redirecting the user to /login
        }

        // handling the error...
        return handleResponseError(error);
    }
);


export default client;
