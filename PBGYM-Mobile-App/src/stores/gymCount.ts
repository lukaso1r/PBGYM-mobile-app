import { defineStore } from "pinia"
import { ref } from "vue"
import { getGymCount as apiGymCount } from "@/services/api"

export const useGymCount = defineStore('gymCount', () => {

    const gymCount = ref<number | null>(null);

    const getGymCount = async () => {
        try {
            const response = await apiGymCount();
            gymCount.value = response.data;
            console.log('Gym count:', gymCount);
        } catch (error) {
            console.error('Błąd pobierania danych:', error);
            throw new Error('Błąd pobierania danych');
        }
    }

    


    return{
        getGymCount,

        gymCount
    }
})