import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login as apiLogin } from '@/services/api';
import { getMemberData as apiMemberData } from '@/services/api';
import { getWorkerData as apiWorkerData } from '@/services/api';

export const useLoginStore = defineStore('loginStore', () => {
    const token = ref<string | null>(null);
    const userType = ref<string | null>(null);
    const router = useRouter();
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const workerData = ref<any>(null);
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const memberData = ref<any>(null);

    const login = async (email: string, password: string) => {
        console.log('Logowanie starrrrrrrt')
        try {
            const response = await apiLogin(email, password); 
            
            token.value = response.data.jwt;
            userType.value = response.data.userType;

            localStorage.setItem('token', token.value || 'error');
            localStorage.setItem('userType', userType.value || 'error');

            if (userType.value === 'Member' && token.value) {
                console.log('Logowanie Member')

                const memberResponse = await apiMemberData(email, token.value);
                memberData.value = memberResponse.data;
                localStorage.setItem('memberData', JSON.stringify(memberData.value));
                console.log('Dane klienta:', memberData);

                router.push({ name: 'Member' });

            } else if (userType.value === 'Worker' && token.value) {
                console.log('Logowanie Worker')

                const workerResponse = await apiWorkerData(email, token.value);
                workerData.value = workerResponse.data;
                localStorage.setItem('workerData', JSON.stringify(workerData.value));
                console.log('Dane pracownika:', workerData);

                router.push({ name: 'Worker' });

            }
        } catch (error) {
            console.error('Błąd logowania:', error);
            throw new Error('Błąd logowania');
        }
    };

    const logout = () => {
        token.value = null;
        userType.value = null;
        workerData.value = null;
        memberData.value = null;
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        localStorage.removeItem('memberData');
        localStorage.removeItem('workerData');
        console.log('Wylogowano', token.value, userType.value);
        router.push({ name: 'Home' });
    };
    


    return { token, userType, workerData, memberData, login, logout };
});
