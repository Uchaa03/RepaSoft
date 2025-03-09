import {createRouter, createWebHistory} from "vue-router";
import LandingView from "@/views/LandingView.vue";
import LoginComponent from "@/components/forms/LoginComponent.vue";
import RegisterComponent from "@/components/forms/RegisterComponent.vue";
import ContactComponent from "@/components/forms/ContactComponent.vue";

//Create object routes
const routes = [
    {path: "/", component: LandingView},
    {path: "/login", component: LoginComponent},
    {path: "/register", component: RegisterComponent},
    {path: "/contact", component: ContactComponent},

]

//Create component for router
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;