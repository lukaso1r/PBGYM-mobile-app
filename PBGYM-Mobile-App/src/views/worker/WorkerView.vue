<script setup>
import { IonButtons, IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/vue';
import { IonIcon } from '@ionic/vue';
import { logOutOutline} from 'ionicons/icons';
import { useLoginStore } from '@/stores/loginStore';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ref } from 'vue';


const loginStore = useLoginStore();
const workerData = loginStore.workerData;
const scanedQr = ref('');
const isScanning = ref(false);

const handleLogout = () => {
  console.log('Wylogowanie:', workerData.name);
  loginStore.logout();
}

const startScan = async () => {
  try {
    const status = await BarcodeScanner.checkPermission({ force: true });
    if (!status.granted) {
      console.error('Brak uprawnień do aparatu');
      return;
    }

    isScanning.value = true; // Ustaw skaner na aktywny
    document.body.classList.add('scanner-active');

    const options = {
      formats: ['QR_CODE'],
      torchOn: true,
      torchOff: false,
      drawSight: true,
      disableSuccessBeep: false,
      disableAnimations: true,
      disableSuccessCheck: false,
      returnImage: false,
      resultDisplayDuration: 500,
      closeCallback: () => {
        closeScanner();
      },
    };
    
    const result = await BarcodeScanner.startScan(options);

    if (result.hasContent) {
      scanedQr.value = result.content;
      alert(`Zeskanowany kod QR: ${result.content}`);
    } else {
      alert('Nie udało się zeskanować kodu QR.');
    }
  } catch (error) {
    console.error('Błąd podczas skanowania:', error);
  } finally {
    closeScanner(); // Zatrzymaj skanowanie
  }
};

const closeScanner = async () => {
  await BarcodeScanner.stopScan(); // Zatrzymaj skanowanie
  isScanning.value = false; // Zresetuj stan skanera
  document.body.classList.remove('scanner-active');
};
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
  <ion-content class="ion-padding" style="" > 
    
    <h1 class="helloTitle">Użyj skanera, aby zweryfikować klienta</h1>
    
    <div class="scanerContainer">
      <ion-button @click="startScan" fill="clear">
        <img src="/scan.svg" alt="Button Image" class="qr">
      </ion-button>
      <p class="buttonText">Kliknij aby uruchomić skaner</p>
    </div>

    <!-- Wyświetl zeskanowany kod QR -->
    <div v-if="scanedQr" class="scanResult">
      <p>Zeskanowany kod QR: {{ scanedQr }}</p>
    </div>
    <p>Zeskanowany kod QR: {{ scanedQr || 'qrhere' }}</p>

    <!-- Przycisk zamykający skaner, gdy jest aktywny -->
    <div v-if="isScanning" class="scanner-close-button">
      <ion-button @click="closeScanner" color="danger">Zamknij skaner</ion-button>
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
.qr {
  border-radius: 25px;
  background-color: #f5f5f5;
  width: 100%;
}

.scanerContainer {
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

.buttonText {
  color: white;
  font-size: 1.2em;
  margin-top: 1em;
}

.avatarButton {
  width: 100%; 
  max-width: 4em; 
  height: auto; 
  border-radius: 50%;
}

.helloTitle {
  font-size: 2em;
  line-height: 1.4em;
}

.bottomNavigation {
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

.scanner-close-button {
  display: flex;
  justify-content: center;
  margin-top: 1em;
}

.scanner-active ion-header,
.scanner-active ion-content {
  display: none;
}

body.scanner-active {
  background: transparent;
}
</style>
