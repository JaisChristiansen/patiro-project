import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'test',
      // route level code-splitting
      // this generates a separate chunk (Test.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TestView.vue'),
    },
    // {
    //   path: '/other',
    //   name: 'home',
    //   component: HomeView,
    // },
  ],
});

export default router;
