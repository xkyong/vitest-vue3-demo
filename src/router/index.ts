import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// tsconfig.json 中需要配置 paths 关于 `@/*` 的别名，
// 否则会出现 `Cannot find module '@/components/TodoApp/index.vue' or its corresponding type declarations.`
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
