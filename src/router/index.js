import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'homePage',
      path: '/',
      component: () => import('@/components/HomePage.vue'),
    },
    {
      name: 'calc',
      path: '/calc',
      component: () => import('../views/CalcView.vue'),
    },
    {
      name: 'garages',
      path: '/garages',
      component: () => import('@/views/GarageView.vue'),
    },
    {
      name: 'garage',
      path: '/garages/:id',
      component: () => import('@/views/GarageDetailView.vue'),
    },
    {
      name: 'tenants',
      path: '/tenants',
      component: () => import('@/views/TenantsView.vue'),
    },
    {
      name: 'payments',
      path: '/payments',
      component: () => import('@/views/PaymentsView.vue'),
    },
  ],
});

export default router;
