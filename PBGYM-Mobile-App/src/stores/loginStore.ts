import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login as apiLogin } from '@/services/api';
import { getMemberData as apiMemberData } from '@/services/api';
import { getWorkerData as apiWorkerData } from '@/services/api';
import { getMemberPass as apiMemberPass } from '@/services/api';
import { getGymEntryHistory as apiGymEntryHistory } from '@/services/api';
import { getTrainerData as apiTrainerData} from '@/services/api';
import { getMemberUpcomingClasses as apiMemberUpcomingClasses } from '@/services/api';
import { getTrainerUpcomingClasses as apiTrainerUpcomingClasses } from '@/services/api';
import { getGroupClassMembers as apiGroupClassMembers } from '@/services/api';

export const useLoginStore = defineStore('loginStore', () => {
    const token = ref<string>('');
    const userType = ref<string | null>(null);
    const router = useRouter();
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const workerData = ref<any>(null);
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const memberData = ref<any>(null);
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const memberActivePass = ref<any>(null);
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const memberGymEntryHistory = ref<any>(null);
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const memberGroupClassesUpcoming = ref<any>(null);
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const trainerGroupClassesUpcoming = ref<any>(null);
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const groupClassMembers = ref<any>(null);


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
            } else if(userType.value === 'Trainer' && token.value) {
                console.log('Logowanie Trainer')
                const memberResponse = await apiTrainerData(email, token.value);
                memberData.value = memberResponse.data;
                localStorage.setItem('memberData', JSON.stringify(memberData.value));
                console.log('Dane pracownika:', memberData);
                router.push({ name: 'Trainer' });
            }

        } catch (error) {
            console.error('Błąd logowania:', error);
            throw new Error('Błąd logowania');
        }
    };

    const getMemberActivePass = async (email: string) => {
        try {
            const response = await apiMemberPass(email, localStorage.getItem('token') || '');
            memberActivePass.value = response.data;
            console.log('Aktywny karnet:', memberActivePass);
        } catch (error) {
            console.error('Błąd pobierania danych:', error);
            throw new Error('Błąd pobierania danych');
        }
    }

    const getMemberGymEntryHistory = async (email: string) => {
        try {
            const response = await apiGymEntryHistory(email, localStorage.getItem('token') || '');
            memberGymEntryHistory.value = response.data;
            console.log('Historia wejść do siłowni:', memberGymEntryHistory);
        } catch (error) {
            console.error('Błąd pobierania danych:', error);
            throw new Error('Błąd pobierania danych');
        }
    }

    const getMemberUpcomingClasses = async (email: string) => {
        try {
            const response = await apiMemberUpcomingClasses(email, localStorage.getItem('token') || '');
            memberGroupClassesUpcoming.value = response.data;
            console.log('Nadchodzące zajęcia:', memberGroupClassesUpcoming);
        } catch (error) {
            console.error('Błąd pobierania danych:', error);
            throw new Error('Błąd pobierania danych');
        }
    }

    const getTrainerUpcomingClasses = async (email: string) => {
        try {
            const response = await apiTrainerUpcomingClasses(email, localStorage.getItem('token') || '');
            trainerGroupClassesUpcoming.value = response.data;
            console.log('Nadchodzące zajęcia:', trainerGroupClassesUpcoming);
        } catch (error) {
            console.error('Błąd pobierania danych:', error);
            throw new Error('Błąd pobierania danych');
        }
    }

    const getGroupClassMembers = async (classId: number) => {
        try {
            const response = await apiGroupClassMembers(classId, localStorage.getItem('token') || '');
            groupClassMembers.value = response.data;
            console.log('Członkowie zajęć:', groupClassMembers);
        } catch (error) {
            console.error('Błąd pobierania danych:', error);
            throw new Error('Błąd pobierania danych');
        }
    }

    const logout = () => {
        token.value = '';
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
    


    return { 
        token, 
        userType, 
        workerData, 
        memberData, 
        memberActivePass,
        memberGymEntryHistory,
        memberGroupClassesUpcoming,
        trainerGroupClassesUpcoming,
        groupClassMembers,
        login, 
        logout, 
        getMemberActivePass,
        getMemberGymEntryHistory,
        getMemberUpcomingClasses,
        getTrainerUpcomingClasses,
        getGroupClassMembers
    };
});
