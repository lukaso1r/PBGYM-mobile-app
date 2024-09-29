<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding-bottom">
      <div id="container" class="ion-no-padding">
        <img src="../../public/backgrounddwa.jpg" alt="PBGYM Logo">
        <div class="ion-padding textContainer">
          <div class="welcomeTitle">Wherever you are health is number one</div>
          <p class="welcomeParaghraph">There is no instant way to a healthy life</p>
          <ion-button @click="() => router.push({name: 'Login'})">Dołącz do nas!</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

</script>

<style scoped>

.ion-content-bottom {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  
}

#container {
  text-align: center;
  width: 100%;
  max-height: 100svh;
  
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

.welcomeParaghraph{
  padding-bottom: 2em;
}

#container a {
  text-decoration: none;
}

.welcomeTitle {
  font-size: 2em;
  font-weight: bold;
  color:#192126;
  padding-top: 1em;
}

.textContainer{
  display: flex;
  flex-direction: column;
  gap: 15px;
}


</style>
