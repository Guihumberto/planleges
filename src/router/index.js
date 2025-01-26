// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        name: 'Início',
        component: () => import('@/pages/index.vue'),
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/pages/Home.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/pages/about.vue'),
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
      {
        path: '/revisaoPDF/:id',
        name: 'RevisaoPDF',
        component: () => import('@/pages/revisaoPDF.vue'),
      },
      {
        path: '/metas',
        name: 'Metas',
        component: () => import('@/pages/metas.vue'),
      },
      {
        path: '/metas/elaborar/:id',
        name: 'Elaborar',
        component: () => import('@/pages/elaborarMeta.vue'),
      },
      {
        path: '/metas/user',
        name: 'listmetas',
        component: () => import('@/pages/metasUser.vue'),
      },
      {
        path: '/metas/user/:id',
        name: 'mostrar',
        component: () => import('@/pages/userMeta.vue'),
      },
      {
        path: '/conteudo',
        name: 'conteudo',
        component: () => import('@/pages/addConteudo.vue'),
      },
      {
        path: '/conteudo/:id',
        name: 'inserir',
        component: () => import('@/pages/addementa.vue'),
      },
      {
        path: '/conteudo/cadementa/:id',
        name: 'ementa',
        component: () => import('@/pages/cadEmenta.vue'),
      },
    ],
  },
  {
    path: '/revisaoPrint/:id',
    component: () => import('@/layouts/printdefault.vue'),
    children: [
      {
        path: '',
        name: 'RevisaoPrint',
        component: () => import('@/pages/revisaoPrint.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
