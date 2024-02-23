// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useRegisterStore } from '@/store/useRegisterStore'

const requireAuth =  async(to, from, next) => {
  const userStore = useRegisterStore()
  const user = await userStore.currentUser()
  if(user){
    next()
  } else {
    next('/login')
  }
}

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/pages/index.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/login.vue'),
      },
      {
        path: '/config',
        name: 'Config',
        component: () => import('@/pages/config.vue'),
        // beforeEnter: requireAuth
      },
      {
        path: '/revisao/:id',
        name: 'Revisao',
        component: () => import('@/pages/revisao.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router