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

export const postRegisterQRScan = (email: string, token: string) => {
    console.log('Worker QR Scan start', email, token);
    return apiClient.post(`/gym/registerQRscan/${email}`, {},  { headers: { Authorization: `Bearer ${token}` } });

}

export const getGymCount = () => {
    return apiClient.get('/gym/count');
}

export const getMemberPass = (email: string, token: string) => {
    console.log('Member pass start', email, token);
    return apiClient.get(`/passes/${email}`, { headers: { Authorization: `Bearer ${token}` } });
}

export const getGymEntryHistory = (email: string, token: string) => {
    return apiClient.get(`/memberStatistics/getDailyGymMinutes/${email}`, { headers: { Authorization: `Bearer ${token}` } });
}

export const getTrainerData = (email: string, token: string) => {
    return apiClient.get(`/trainers/${email}`, { headers: { Authorization: `Bearer ${token}` } });
}

export const getMemberUpcomingClasses = (email: string, token: string) => {
    return apiClient.get(`/groupClasses/member/${email}/upcoming`, { headers: { Authorization: `Bearer ${token}` } });
}

export const getTrainerUpcomingClasses = (email: string, token: string) => {
    return apiClient.get(`/groupClasses/trainer/${email}/upcoming`, { headers: { Authorization: `Bearer ${token}` } });
}

export const getGroupClassMembers = (classId: number, token: string) => {
    return apiClient.get(`/groupClasses/${classId}/members`, { headers: { Authorization: `Bearer ${token}` } });
}