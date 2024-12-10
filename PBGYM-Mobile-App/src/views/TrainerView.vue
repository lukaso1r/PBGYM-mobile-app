<script setup lang="ts">
import { IonButtons, IonContent, IonHeader, IonPage, IonToolbar, IonAlert, IonButton, IonModal } from '@ionic/vue';
import { IonIcon } from '@ionic/vue';
import { logOutOutline, personOutline, refreshOutline, timeOutline, calendarOutline
} from 'ionicons/icons';
import { useLoginStore } from '@/stores/loginStore';
import QrcodeVue from 'qrcode.vue'
import type { Level, RenderAs, ImageSettings } from 'qrcode.vue'
import {  onMounted, ref } from 'vue'
import { useGymCount } from '@/stores/gymCount';
import { formatDateTime } from '../../utils/date';

// const modal = ref<HTMLIonModalElement | null>(null);

const loginStore = useLoginStore();
const gymCountStore = useGymCount();

const isMembersOpen = ref(false);
const isClassesOpen = ref(false);

const memberLocal = JSON.parse(localStorage.getItem('memberData') || '{}');

const handleLogout = () => {
  loginStore.logout();
}

const value = ref(`${memberLocal.email}`)
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

const getClassesMembers = (classId: number) => {
  loginStore.getGroupClassMembers(classId);
  isMembersOpen.value = true;
}


onMounted(() => {
  gymCountStore.getGymCount();
  loginStore.getTrainerUpcomingClasses(memberLocal.email);
});


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
        <ion-button id="open-modal2" @click="isClassesOpen = true" style="padding: 0; border: none;">
          <ion-icon slot="end" :icon="calendarOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding-horizontal"> 
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
        Pokaż kod w recepcji, aby skorzystać z obiektu         
      </p>
    </div>

    <div class="gymCountContainer">
      <p v-if="gymCountStore.gymCount">Liczba osób na siłowni: {{ gymCountStore.gymCount }}</p>
      <p v-else>Brak danych o liczbie osób na siłowni</p>
      <ion-icon @click="gymCountStore.getGymCount" :icon="refreshOutline" color="primary"></ion-icon>
    </div>

    <div class="bottomNavigation">
      <ion-button  expand="block" fill="clear" @click="handleLogout">
        <ion-icon slot="end" :icon="logOutOutline"></ion-icon>
        Wyloguj się
      </ion-button>
    </div>

    <ion-modal ref="modal" trigger="open-modal2" :is-open="isClassesOpen" :initial-breakpoint="0.25" :breakpoints="[0, 0.25, 0.5, 0.75]">
        <ion-content class="ion-padding">
          <ion-list>
            <ion-item v-if="loginStore.trainerGroupClassesUpcoming" class="ion-no-padding ion-no-margin">
              <ul style="list-style: none;" class="ion-no-padding ">
                <h3 class="ion-padding-bottom">Nadchodzące zajęcia grupowe</h3>
                <li class="groupClass" v-for="groupClass in loginStore.trainerGroupClassesUpcoming" :key="groupClass.id" @click="getClassesMembers(groupClass.id)">
                  <p style="width: 100%; margin: 0;">{{groupClass.title}}</p>
                  <p style=" margin: 0;">{{formatDateTime(groupClass.dateStart)}}</p>
                  <div class="timeWIthIcon"><ion-icon style="padding: 0; color:var(--ion-color-primary)" :icon="timeOutline" color="primary" class="ion-no-padding"></ion-icon><p>{{groupClass.durationInMinutes}} min</p></div>
                </li>
              </ul>
            </ion-item>
            <ion-item v-else class="ion-no-padding ion-no-margin">
              <h2>Nie masz zaplanowanych zajęć grupowych</h2>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-modal>

      <ion-modal :is-open="isMembersOpen">
        <ion-header>
          <ion-toolbar>
            <ion-title class="ion-padding-start">Lista zapisanych klientów</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="isMembersOpen = false">Zamknij</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-no-padding ion-padding-top ion-no-margin">
            <ion-list lines="full" class="ion-no-padding">
                <ion-item v-for="(member, index) in loginStore.groupClassMembers" :key="member.id">
                    <ion-label>{{ (index+1) }}. {{member.name}} {{member.surname}}</ion-label>
                    <p>{{member.email}}</p>
                </ion-item>
            </ion-list>
        </ion-content>
      </ion-modal>
    </ion-content>
</ion-page>

</template>


<style scoped>

.groupClass{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  
}

.groupClass *{
  padding-right: 15px;
}

.historyEntry{
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
}

.timeWIthIcon{
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  width: fit-content;
}

.passDetail{
  color: #112979;
}

.gymCountContainer{

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;


}
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
  margin-bottom: 1.6em;
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

.gymCountConainer{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center; 
}

ion-row {
  flex-wrap: nowrap;
}

.gymCountColumn,
.refreshButtonColumn {
  flex: 0 0 auto;
  white-space: nowrap;
}
</style>