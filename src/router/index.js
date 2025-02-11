import { createRouter, createWebHistory } from 'vue-router';
import Simulador from '../views/Simulador.vue';

const routes = [
  { path: '/', component: Simulador }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
