import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import TodoApp from '@/components/TodoApp/index.vue'

const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    component: TodoApp
  },
  {
    path: '/active',
    component: TodoApp
  },
  {
    path: '/completed',
    component: TodoApp
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'selected'
})

export { routes }

export default router
