

import axios from "axios";

export const StoreApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {"Content-Type": "application/json"},
});

let csrfToken: string | null = null;


export const initCsrf = async (): Promise<void> => {
  const response = await StoreApi.get<{ csrfToken: string }>("csrf/");
  csrfToken = response.data.csrfToken;
  if (csrfToken) {
    console.log(csrfToken)
  }
};

StoreApi.interceptors.request.use((config) => {
  const method = config.method?.toLowerCase();
  if (csrfToken && ["post", "put", "patch", "delete"].includes(method ?? "")) {config.headers.set("X-CSRFToken", csrfToken);}
  return config;
});






