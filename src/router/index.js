import { createRouter, createWebHistory } from 'vue-router'
import initialView from "@/views/loading.view.vue";
import loginView from "@/views/users/login.view.vue";
import invoicesView from "@/views/invoices/invoices.view.vue";
import walletsView from "@/views/wallets/wallets.view.vue";
import walletView from "@/views/wallets/wallet.view.vue";
import registerView from "@/views/users/register.view.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'initializing',
      component: initialView,
    },
    {
      path: '/login',
      name: 'login',
      component: loginView,
    },
    {
      path: '/register',
      name: 'register',
      component: registerView,
    },
    {
      path: '/invoices',
      name: 'invoices',
      component: invoicesView,
    },
    {
      path: '/wallets',
      name: 'wallets',
      component: walletsView,
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: walletView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'home',
      redirect: { name: 'invoices' }
    }
  ],
})

export default router
