 
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonContent, IonPage, IonInput, IonItem, IonButton, IonToast } from '@ionic/vue';
import { useLoginStore } from '@/stores/loginStore';

// Przechowywanie stanu pól
const email = ref('test1@member.com');
const password = ref('12345678');

// Obsługa walidacji
const emailError = ref('');
const passwordError = ref('');

const router = useRouter();
const loginStore = useLoginStore();

const isOpen = ref(false);
    const setOpen = (state: boolean) => {
    isOpen.value = state;
};

function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailError.value = emailPattern.test(email.value) ? '' : 'Nieprawidłowy adres email';
}

function validatePassword() {
    passwordError.value = password.value.length >= 6 ? '' : 'Hasło musi mieć co najmniej 8 znaków'; 
}

async function handleLogin() {
    validateEmail();
    validatePassword();

    if (!emailError.value && !passwordError.value) {
        try {
            await loginStore.login(email.value, password.value);
            if (loginStore.userType === 'Member') {
                // router.push({ name: 'Client' });
            } else if (loginStore.userType === 'Worker') {
                // router.push({ name: 'Worker' });
            }
        } catch (error) {
            console.error('Błąd logowania:', error);
            setOpen(true);
        }
    }
}

</script>


<template>
<ion-page>
    <ion-content :fullscreen="true" class="">
        <div class="login-container ">

            <img src="/logo-blue.svg" alt="PBGYM Logo" class="ion-padding mainLogo">
            <div class="loginForm ">
                <h1>Logowanie</h1>

                <ion-item lines="none">
                    <ion-input 
                        v-model="email" 
                        fill="outline"
                        type="email" 
                        placeholder="Wprowadź email" 
                        required
                        :error="emailError"
                        @ionBlur="validateEmail">
                    </ion-input>
                </ion-item>
                <p class=" errorText" v-if="emailError" color="danger">{{ emailError }}</p>

                <ion-item lines="none">
                    <ion-input 
                        v-model="password" 
                        fill="outline"
                        type="password" 
                        placeholder="Wprowadź hasło" 
                        required
                        :error="passwordError"
                        @ionBlur="validatePassword">
                    </ion-input>
                </ion-item>
                <p class=" errorText" v-if="passwordError" color="danger">{{ passwordError }}</p>

                <ion-button expand="block" @click="handleLogin">Zaloguj się</ion-button>
                <ion-button expand="block" fill="clear" @click="() => router.push({name: 'Home'})">Powrót</ion-button>
            </div>
            <ion-toast :is-open="isOpen" message="Błąd logowania, spróbuj ponownie" :duration="5000"></ion-toast>
        </div>
    </ion-content>
</ion-page>
</template>
 
  
<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    height: 100%;
    padding: 4em 0em;
    background-image: linear-gradient(#5202268c 60%, #ffffff 40%), url("../../public/backgrounddwa.jpg");
    background-size: contain;
    background-repeat: no-repeat;
    gap: 4em;
}

h1 {
    margin-bottom: 2em;
    font-size: 2em;
    text-align: center;
}

ion-item {
    margin-bottom: 1em;
    width: 100%;
}

ion-button {
    margin-top: 1.5em;
    width: 100%;
}

.mainLogo {
    width: 60%;
    background: white;
    border-radius: 25px;
    opacity: 0.9;
    padding: 2em 3em;
}

.loginForm{
    width: 100%;
    padding: 3em 1em;
    background: white;
    border-radius: 70px 0 0 0;
    margin: 0 auto;
}

.loginForm h1{
    text-align: center;
    font-weight: 600;
    font-size: 2.3em;
}

.errorText{
    padding: 0em 0 1em 1em;
    color: red;
}
</style>
  