<script setup lang="ts">
import { IonButtons, IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/vue';
import { IonIcon } from '@ionic/vue';
import { logOutOutline} from 'ionicons/icons';
import { useLoginStore } from '@/stores/loginStore';
import QrcodeVue from 'qrcode.vue'
import type { Level, RenderAs, ImageSettings } from 'qrcode.vue'
import { ref } from 'vue'

const loginStore = useLoginStore();

const memberLocal = JSON.parse(localStorage.getItem('memberData') || '{}');

const handleLogout = () => {
  loginStore.logout();
}

const value = ref('2')
const level = ref<Level>('H') // Zwiększ poziom jakości kodu QR
const size = ref(400) // Zwiększ rozmiar kodu QR
const renderAs = ref<RenderAs>('svg') // Użyj SVG jako format renderowania
const background = ref('white') // Ustaw tło kodu QR na białe
const foreground = ref('black') // Ustaw kolor kodu QR na czarny
const margin = ref(2) // Zwiększ margines kodu QR
const imageSettings = ref<ImageSettings>({
  src: '/logo-blue.svg',
  width: 120,
  height: 100,
  excavate: true,
})

</script>

<template>


<ion-page id="main-content">
  <ion-header class="ion-padding-vertical ion-no-border" collapse="fade">
    <ion-toolbar>
      <ion-buttons slot="start" class="ion-padding-start">
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
    <h1 class="helloTitle">Cześć {{memberLocal.name}},</h1>
    <h2 class="helloSubtitle">cieszymy się, że do nas wróciłeś!</h2>

    <div class="qrCodeContainer">
      <qrcode-vue
      :value="value"
      :level="level"
      :render-as="renderAs"
      :background="background"
      :foreground='foreground'
      :image-settings='imageSettings'
      :size="size"
      :margin="margin"
      class="qr"
    />
      <p>
        <span style="color: gray; font-size: 1em;">Twoje Id: {{memberLocal.id}}</span>
        <br/>
        Pokaż kod w recepcji, aby skorzystać z obiektu 
        
      </p>
    </div>
    
    <div class="bottomNavigation">
      <ion-button expand="block" fill="clear" @click="handleLogout">
        <ion-icon slot="end" :icon="logOutOutline"></ion-icon>
        Wyloguj się
      </ion-button>
    </div>
  </ion-content>
</ion-page>

</template>


<style scoped>
#qr-code {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2em;
}

.avatarButton {
  width: 100%; 
  max-width:4em; 
  height: auto; 
  border-radius: 50%;
}

.helloTitle{
  font-size: 2.7em;
}

.helloSubtitle{
  font-size: 1.2em;
  color: #7a7a7a;
  margin-bottom: 2.5em;
}

.qrCodeContainer{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #112979;
  border-radius: 15px;
  box-shadow: 0px 0px 17px 0px rgba(17, 41, 121, 0.274);
}

.qrCodeContainer p{
  color: white;
  padding: 0 1em 1em 1em;
  text-align: center;
  font-weight: 500;
  letter-spacing: 0.7px;
  line-height: 30px;
  
}

.qr{
  padding: 1em 1em 0 1em;
  border-radius: 25px;
  width: 100%;

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
