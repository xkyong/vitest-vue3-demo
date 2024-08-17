import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createWebHashHistory } from 'vue-router'
import TodoFooter from '../TodoFooter.vue'
import { routes } from '@/router'

import type { VueWrapper } from '@vue/test-utils'

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  linkActiveClass: 'selected'
})

describe('TodoApp.vue', () => {
  let wrapper: VueWrapper | null = null
  const todos = [
    { id: 1, text: 'eat', done: false },
    { id: 2, text: 'play', done: true },
    { id: 3, text: 'sleep', done: false }
  ]
  beforeEach(() => {
    wrapper = mount(TodoFooter, {
      props: { todos },
      global: {
        plugins: [router]
      }
    })
  })

  it('Done Todos count', () => {
    const vm = wrapper!.vm as InstanceType<typeof TodoFooter>
    const doneTodoCount = vm.todos.filter(todo => !todo.done).length
    const countEl = wrapper!.find('[data-testid="done-todos-count"]')
    expect(parseInt(countEl.text())).toBe(doneTodoCount)
  })

  it('Clear Completed Show', async () => {
    // const vm = wrapper!.vm as InstanceType<typeof TodoFooter>
    const button = wrapper!.find('[data-testid="clear-completed"')
    expect(button.exists()).toBeTruthy()

    // 清除所有任务的完成状态，判断 button 不存在
    // 此时不生效，因为 todos 是 prop，不允许直接修改！
    // vm.todos.forEach(t => (t.done = false))

    wrapper = mount(TodoFooter, {
      props: {
        todos: [
          { id: 1, text: 'eat', done: false },
          { id: 2, text: 'play', done: false },
          { id: 3, text: 'sleep', done: false }
        ]
      },
      global: {
        plugins: [router]
      }
    })

    // 因为 wrapper 重新生成，因此这里要重新使用 find 拿下 button
    expect(wrapper!.find('[data-testid="clear-completed"').exists()).toBeFalsy()
  })

  it('Clear Completed', async () => {
    const button = wrapper!.find('[data-testid="clear-completed"')
    await button.trigger('click')
    expect(wrapper!.emitted()['clear-completed']).toBeTruthy()
  })

  it('Router link activeClass', async () => {
    const links = wrapper!.findAllComponents({ name: 'RouterLink' })

    router.push('/active')
    await router.isReady()
    await flushPromises()
    for (let i = 0; i < links.length; i++) {
      const link = links.at(i)
      if (link!.vm.to === '/active') {
        expect(link!.classes()).toContain('selected')
      } else {
        expect(link!.classes()).not.toContain('selected')
      }
    }

    router.push('/completed')
    await router.isReady()
    await flushPromises()
    for (let i = 0; i < links.length; i++) {
      const link = links.at(i)
      if (link!.vm.to === '/completed') {
        expect(link!.classes()).toContain('selected')
      } else {
        expect(link!.classes()).not.toContain('selected')
      }
    }

    router.push('/')
    await router.isReady()
    await flushPromises()
    for (let i = 0; i < links.length; i++) {
      const link = links.at(i)
      if (link!.vm.to === '/') {
        expect(link!.classes()).toContain('selected')
      } else {
        expect(link!.classes()).not.toContain('selected')
      }
    }
  })

  it('snapshot', () => {
    expect(wrapper!.html()).toMatchSnapshot()
  })
})
