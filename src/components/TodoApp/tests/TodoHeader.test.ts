import { shallowMount } from '@vue/test-utils'
import TodoHeader from '../TodoHeader.vue'

describe('TodoHeader.vue', () => {
  it('New todo', async () => {
    const wrapper = shallowMount(TodoHeader)
    const newTodoInput = wrapper.find('input[data-testid="new-todo"]')
    const text = 'play'
    await newTodoInput.setValue(text)
    await newTodoInput.trigger('keyup.enter')
    expect(wrapper.emitted()['new-todo']).toBeTruthy()
    // wrapper.emitted()['new-todo'] => [ [ 'play' ] ]
    expect((wrapper.emitted()['new-todo'][0] as string[])[0]).toBe(text)
    expect((newTodoInput.element as HTMLInputElement).value).toBe('')
  })
})
