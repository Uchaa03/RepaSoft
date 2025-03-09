import { createApp } from 'vue'
import App from './App.vue'
import "./assets/sass/main.sass"
import router from "@/route/router.js";

createApp(App).use(router).mount('#app')
