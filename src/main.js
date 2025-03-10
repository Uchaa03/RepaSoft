import { createApp } from 'vue'
import App from './App.vue'
import "./assets/sass/main.sass"
import router from "@/route/router.js";
import {createPinia} from "pinia";

const pinia = createPinia()

createApp(App).use(pinia).use(router).mount('#app')
