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

  it('edit todo', async () => {
    const label = wrapper!.find('[data-testid="todo-text"]')
    const todoItem = wrapper!.find('[data-testid="todo-item"]')
    const todoEdit = wrapper!.find('[data-testid="todo-edit"]')
    await label.trigger('dblclick')
    expect(todoItem.classes()).toContain('editing')

    await todoEdit.trigger('blur')
    expect(todoItem.classes()).not.toContain('editing')
  })

  it('save edit todo', async () => {
    const label = wrapper!.find('[data-testid="todo-text"]')
    const todoEdit = wrapper!.find('[data-testid="todo-edit"]')
    await label.trigger('dblclick')
    
    // 编辑文本框中的内容展示
    expect((todoEdit.element as HTMLInputElement).value).toBe((wrapper!.vm as InstanceType<typeof TodoItem>).todo.text)

    const text = 'hello'
    await todoEdit.setValue(text)

    // 触发回车保存事件
    await todoEdit.trigger('keyup.enter')

    // 数据被修改了，向父组件发布事件
    // expect((wrapper!.vm as InstanceType<typeof TodoItem>).todo.text).toBe(text)
    expect(wrapper!.emitted()['edit-todo']).toBeTruthy()
    expect((wrapper!.emitted()['edit-todo'] as  any[])[0][0]).toEqual({
      id: (wrapper!.vm as InstanceType<typeof TodoItem>).todo.id,
      text
    })
  })
})
