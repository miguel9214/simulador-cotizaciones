import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';

// Verifica si hay un idioma guardado en localStorage, si no, usa 'es'
const idiomaGuardado = localStorage.getItem('idioma') || 'es';

// Aplica el idioma al atributo lang del documento
document.documentElement.lang = idiomaGuardado;

const app = createApp(App);
app.use(router);
app.mount('#app');
