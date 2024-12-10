import { defineStore } from "pinia"
import { ref } from "vue"
import { postRegisterQRScan as apiQrScan } from "@/services/api"
import { getGymCount as apiGymCount } from "@/services/api"

export const useWorkerStore = defineStore('workerStore', () => {

    const gymCount = ref<number | null>(null);

    const qrScan = async (email: string, token: string) => {
        try {
            const response = await apiQrScan(email, token);
            console.log('QR Scan response:', response);
        } catch (error) {
            console.error('Błąd skanowania QR:', error);
            throw new Error('Błąd skanowania QR');
        }
    }

    const getGymCount = async (token: string) => {
        try {
            const response = await apiGymCount(token);
            gymCount.value = response.data;
            console.log('Gym count:', gymCount);
        } catch (error) {
            console.error('Błąd pobierania danych:', error);
            throw new Error('Błąd pobierania danych');
        }
    }

    


    return{
        qrScan,
        getGymCount,

        gymCount
    }
})