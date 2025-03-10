import {createRouter, createWebHistory} from "vue-router";
import LandingView from "@/views/LandingView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ContactView from "@/views/ContactView.vue";
import ChangePasswordView from "@/views/client/ChangePasswordView.vue";
import PanelView from "@/views/technician/PanelView.vue";
import DashboardView from "@/views/client/DashboardView.vue";
import {useAuthStore} from "@/store/authstore.js";

//Create object routes
const routes = [
    {path: "/", component: LandingView},
    {path: "/login", component: LoginView},
    {path: "/register", component: RegisterView},
    {path: "/contact", component: ContactView},
    {path: "/change-password",meta: {requiresAuth: true}, component: ChangePasswordView},
    {path: "/panel",meta: {requiresAuth: true}, component: PanelView},
    {path: "/dashboard",meta: {requiresAuth: true}, component: DashboardView},
]

//Create component for router
const router = createRouter({
    history: createWebHistory(),
    routes
})

//beforeEach is a method for validate routes and redirect
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    // Verify if changePassword is necessary
    if (authStore.shouldChangePassword && to.path !== '/change-password') {
        return next('/change-password')
    }

    // Verify if auth is required and user is authenticated
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return next('/login')
    }

    // If checks are ok, proceed with navigation
    next()
})


export default router;