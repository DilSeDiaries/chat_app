import { createRouter, createWebHistory } from 'vue-router';

// Define your routes
const routes = [
  {
    path: '/',
    name: 'HomeComponent',
    component: () => import('../src/views/HomeComponent.vue') // Lazy-loaded component
  },

  {
    path: '/about',
    name: 'AboutComponent',
    component: () => import('../src/views/AboutComponent.vue') // Lazy-loaded component
  },
  {
    path: '/contact',
    name: 'contactComponent',
    component: () => import('../src/views/ContactComponent.vue') // Lazy-loaded component
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../src/views/LoginComponent.vue') // Lazy-loaded component
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
