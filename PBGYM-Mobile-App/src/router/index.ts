import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import ClientView from '@/views/ClientView.vue'
import WorkerView from '../views/worker/WorkerView.vue'
import HomePage from '../views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/member',
    name: 'Member',
    component: ClientView
  },
  {
    path: '/worker',
    name: 'Worker',
    component: WorkerView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  }


]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
