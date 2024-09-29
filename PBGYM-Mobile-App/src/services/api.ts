import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, 
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = (email: string, password: string) => {
    return apiClient.post('/auth/authenticate', { email, password });
};

export const getMemberData = (email: string, token: string) => {
    return apiClient.get(`/members/${email}`, { headers: { Authorization: `Bearer ${token}` } });
}

export const getWorkerData = (email: string, token: string) => {
    return apiClient.get(`/workers/${email}`, { headers: { Authorization: `Bearer ${token}` } });
}
