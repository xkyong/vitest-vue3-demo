import { shallowMount, flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import TodoApp from '../index.vue'
import TodoItem from '../TodoItem.vue'
import { routes } from '@/router'

import type { VueWrapper } from '@vue/test-utils'

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

describe('TodoApp.vue', () => {
  let wrapper: VueWrapper | null = null
  beforeEach(() => {
    wrapper = shallowMount(TodoApp, {
      global: {
        plugins: [router]
      }
    })

    const vm = wrapper.vm as InstanceType<typeof TodoApp>
    vm.todos = [
      { id: 1, text: 'eat', done: false },
      { id: 2, text: 'play', done: true },
      { id: 3, text: 'sleep', done: false }
    ]
  })

  it('New todo', async () => {
    const vm = wrapper!.vm as InstanceType<typeof TodoApp>
    const text = 'play'
    vm.handleNewTodo(text)
    const todo = vm.todos.find(t => t.text === text)
    expect(todo).toBeTruthy()
  })

  it('Todo List', async () => {
    const vm = wrapper!.vm as InstanceType<typeof TodoApp>
    // `wrapper.setData` will emit error here: `TypeError: Cannot add property todos, object is not extensible`
    // await wrapper.setData({ todos })
    await nextTick()
    expect(wrapper!.findAllComponents(TodoItem).length).toBe(vm.todos.length)
  })

  it('Delete todo', async () => {
    const vm = wrapper!.vm as InstanceType<typeof TodoApp>
    await vm.handleDeleteTodo(1)
    expect(vm.todos.length).toBe(2)
    expect(wrapper!.findAllComponents(TodoItem).length).toBe(2)
  })

  it('Delete not existed todo', async () => {
    const vm = wrapper!.vm as InstanceType<typeof TodoApp>
    await vm.handleDeleteTodo(100)
    expect(vm.todos.length).toBe(3)
    expect(wrapper!.findAllComponents(TodoItem).length).toBe(3)
  })

  it('Edit Todo', async () => {
    const todo = { id: 2, text: 'abc' }
    const vm = wrapper!.vm as InstanceType<typeof TodoApp>
    await vm.handleEditTodo(todo)
    expect(vm.todos[1].text).toBe(todo.text)

    // 当我传入的 text 是空字符串时，执行删除操作
    todo.text = ''
    await vm.handleEditTodo(todo)
    expect(vm.todos.find(t => t.id === todo.id)).toBeFalsy()
  })

  it('Toggle all', async () => {
    const vm = wrapper!.vm as InstanceType<typeof TodoApp>
    const toggleAll = wrapper!.find('[data-testid="toggle-all"]')
    // 断言所有的子任务都被选中
    toggleAll.setValue(true)
    expect(vm.todos.every(t => t.done)).toBeTruthy()
    // 断言所有的子任务都不被选中
    toggleAll.setValue(false)
    expect(vm.todos.every(t => !t.done)).toBeTruthy()
  })

  it('Toggle all state', async () => {
    const toggleAll = wrapper!.find('[data-testid="toggle-all"]')
    const vm = wrapper!.vm as InstanceType<typeof TodoApp>

    // 当所有任务都被选中时，toggleAll 应该被选中
    vm.todos.forEach(todo => (todo.done = true))
    await nextTick()
    expect((toggleAll.element as HTMLInputElement).checked).toBeTruthy()

    // 当有一个任务未被选中时，toggleAll 应该未被选中
    vm.todos[0].done = false
    await nextTick()
    expect((toggleAll.element as HTMLInputElement).checked).toBeFalsy()

  })

  it('Clear all complete', async () => {
    const vm = wrapper!.vm as InstanceType<typeof TodoApp>
    vm.handleClearCompleted()
    await nextTick()
    expect(vm.todos).toEqual([
      { id: 1, text: 'eat', done: false },
      { id: 3, text: 'sleep', done: false }
    ])
  })

  it('Filter todos', async () => {
    const vm = wrapper!.vm as InstanceType<typeof TodoApp>

    // 将路由导航到 /，断言 filterTodos = 完成的任务列表
    router.push('/')
    await router.isReady()
    await flushPromises()
    expect(vm.filterTodos).toEqual([
      { id: 1, text: 'eat', done: false },
      { id: 2, text: 'play', done: true },
      { id: 3, text: 'sleep', done: false }
    ])

    // 将路由导航到 /active，断言 filterTodos = 所有未完成的任务
    router.push('/active')
    await router.isReady()
    await flushPromises()
    expect(vm.filterTodos).toEqual([
      { id: 1, text: 'eat', done: false },
      { id: 3, text: 'sleep', done: false }
    ])

    // 将路由导航到 /completed，断言 filterTodos = 所有已完成的任务
    router.push('/completed')
    await router.isReady()
    await flushPromises()
    expect(vm.filterTodos).toEqual([
      { id: 2, text: 'play', done: true },
    ])
  })
})
