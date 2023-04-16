import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Homepage',
    meta: {
      title: 'Mausritter Character Sheet'
    },
    children: [
      {
        path: '/',
        name: 'Character',
        component: () => import('../components/character/CharCard.vue'),
        meta: {
          title: 'Character'
        }
      },
      {
        path: '/warband',
        name: 'Warband',
        component: () => import('../components/warband/WarbandCard.vue'),
        meta: {
          title: 'Warband'
        }
      },
    ]
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
 }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router