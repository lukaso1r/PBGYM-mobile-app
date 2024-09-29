<script setup>
import { IonButtons, IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/vue';
import { IonIcon } from '@ionic/vue';
import { logOutOutline} from 'ionicons/icons';
import { useLoginStore } from '@/stores/loginStore';

const loginStore = useLoginStore();
const workerData = loginStore.workerData;

const handleLogout = () => {
  console.log('Wylogowanie:', workerData.name);
  loginStore.logout();
}
</script>

<template>

<ion-page id="main-content">
  <ion-header class="ion-padding-vertical ion-no-border" collapse="fade">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-title style="color:#112979;">
          <span style="color:#112979;">PB</span>
          <span style="color:#FF127D;"> - </span>
          <span style="color:#112979;">GYM</span> 
          <br />
          APP 
        </ion-title>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button @click="() => console.log('hej')" style="padding: 0; border: none;">
          <img src="/avatar.jpg" alt="Button Image" class="avatarButton" style="">
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding"> 
    
    <h1 class="helloTitle">Użyj skanera, aby zweryfikować klienta</h1>
    
    <div class="scanerContainer">
      <ion-button @click="() => console.log('hej')" fill="clear">
        <img src="/scan.svg" alt="Button Image" class="qr">
      </ion-button>
      <p class="buttonText">Kliknij aby uruchomić skaner</p>
    </div>
    
    <div class="bottomNavigation">
      <ion-button  expand="block" fill="clear" @click="handleLogout">
        <ion-icon slot="end" :icon="logOutOutline"></ion-icon>
        Wyloguj się
      </ion-button>
    </div>

  </ion-content>
</ion-page>

</template>


<style scoped>

.qr{
  border-radius: 25px;
  background-color: #f5f5f5;
  width: 100%;
}

.scanerContainer{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #112979;
  border-radius: 15px;
  box-shadow: 0px 0px 17px 0px rgba(17, 41, 121, 0.274);
  padding: 1em 0em;
  margin: 2em 0;
}

.buttonText{
  color: white;
  font-size: 1.2em;
  margin-top: 1em;
}

.avatarButton {
  width: 100%; 
  max-width:4em; 
  height: auto; 
  border-radius: 50%;
}

.helloTitle{
  font-size: 2em;
  line-height: 1.4em;
}

.bottomNavigation{
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-top: 2em;
  justify-content: space-evenly;
  position: fixed;
  bottom: 1em;
  left: 0;
  width: 100%;
}
</style>
