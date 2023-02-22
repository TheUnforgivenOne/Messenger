import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import SignUp from './pages/SignUp.vue';
import SignIn from './pages/SignIn.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/signup', component: SignUp },
  { path: '/signin', component: SignIn },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
