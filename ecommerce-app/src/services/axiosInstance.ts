


// import axios from 'axios';
// import ROUTES from '../routers/dashboard/path';


// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
//     withCredentials: true,
//     headers: { 'Content-Type': 'application/json' },
//     paramsSerializer: (params) => {
//         const searchParams = new URLSearchParams();
//         Object.entries(params).forEach(([key, value]) => {
//             if (value === undefined || value === null || value === '') return;

//             if (Array.isArray(value)) {
//                 value.forEach((v) => {if (v !== undefined && v !== null && v !== '') {searchParams.append(key, v);}});
//             } else {
//                 searchParams.append(key, String(value));
//             }
//         });
//         return searchParams.toString();
//     },
// });


// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('admin_access_token');
//         if (token) {config.headers.Authorization = `Bearer ${token}`;}
//         return config;
//     },

//     (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//     (response) => response,

//     async (error) => {
//       if (error.response?.status === 401) {
//           localStorage.removeItem('admin_access_token');
//           localStorage.removeItem('admin_refresh_token');
//           localStorage.removeItem('admin_user');
//           window.location.href = ROUTES.LOGIN
//       }
//       return Promise.reject(error);
//     }
// );


// export default api;

import axios from 'axios';
import ROUTES from '../routers/dashboard/path';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    withCredentials: true,
    headers: {'Content-Type': 'application/json'},
    paramsSerializer: (params) => {
        const searchParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
            if (value === undefined || value === null || value === '') return;

            if (Array.isArray(value)) {
                value.forEach((v) => {
                    if (v !== undefined && v !== null && v !== '') {
                        searchParams.append(key, String(v));
                    }
                });
            } else {
                searchParams.append(key, String(value));
            }
        });

        return searchParams.toString();
    },
});


let csrfToken: string | null = null;

export const initCsrf = async (): Promise<void> => {
    const response = await api.get<{ csrfToken: string }>('csrf/');
    csrfToken = response.data.csrfToken;
};

// Request interceptor: JWT + CSRF
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('admin_access_token');

        if (token) {
            config.headers.set('Authorization', `Bearer ${token}`);
        }

        const method = config.method?.toLowerCase();

        if (
            csrfToken &&
            ['post', 'put', 'patch', 'delete'].includes(method ?? '')
        ) {
            config.headers.set('X-CSRFToken', csrfToken);
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: handle 401
api.interceptors.response.use(
    (response) => response,

    async (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('admin_access_token');
            localStorage.removeItem('admin_refresh_token');
            localStorage.removeItem('admin_user');

            window.location.href = ROUTES.LOGIN;
        }

        return Promise.reject(error);
    }
);

export default api;


