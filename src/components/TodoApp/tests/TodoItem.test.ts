import { shallowMount } from '@vue/test-utils'
import TodoItem from '../TodoItem.vue'

import type { VueWrapper } from '@vue/test-utils'

describe('TodoItem.vue', () => {
  let wrapper: VueWrapper | null = null
  const todo = { id: 1, text: '测试', done: true }

  beforeEach(() => {
    wrapper = shallowMount(TodoItem, {
      props: { todo }
    })
  })

  it('text', () => {
    expect(wrapper!.find('[data-testid="todo-text"]').text()).toBe(todo.text)
  })

  it('done', async () => {
    const done = wrapper!.find('[data-testid="todo-done"]')
    const todoItem = wrapper!.find('[data-testid="todo-item"]')
    expect((done.element as HTMLInputElement).checked).toBeTruthy()
    expect(todoItem.classes()).toContain('completed')

    await done.setValue(false)
    expect(todoItem.classes()).not.toContain('completed')

    await done.setValue(true)
    expect(todoItem.classes()).toContain('completed')
  })

  it('delete todo', async () => {
    const deleteBtn = wrapper!.find('[data-testid="delete"]')
    await deleteBtn.trigger('click')
    expect(wrapper!.emitted()['delete-todo']).toBeTruthy()
    expect((wrapper!.emitted()['delete-todo'] as any[])[0][0]).toBe(todo.id)
  })
})
