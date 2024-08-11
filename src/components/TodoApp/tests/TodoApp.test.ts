import { shallowMount } from '@vue/test-utils'
import { nextTick } from 'vue'
import TodoApp from '../index.vue'  
import TodoItem from '../TodoItem.vue'

import type { VueWrapper } from '@vue/test-utils'

describe('TodoApp.vue', () => {
  let wrapper: VueWrapper | null = null
  beforeEach(() => {
    wrapper = shallowMount(TodoApp)
    const vm = wrapper.vm as InstanceType<typeof TodoApp>
    vm.todos = [
      { id: 1, text: 'eat', done: false },
      { id: 2, text: 'play', done: false },
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
})
