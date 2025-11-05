import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import CartView from "@/views/CartView.vue";

//Define routes 
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        //Home page
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        //Cart page
        {
            path: '/cart',
            name: 'cart',
            component: CartView
        }

    ]
});

export default router;