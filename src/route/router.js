import {createRouter, createWebHistory} from "vue-router";
import LandingView from "@/views/LandingView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ContactView from "@/views/ContactView.vue";

//Create object routes
const routes = [
    {path: "/", component: LandingView},
    {path: "/login", component: LoginView},
    {path: "/register", component: RegisterView},
    {path: "/contact", component: ContactView},

]

//Create component for router
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;