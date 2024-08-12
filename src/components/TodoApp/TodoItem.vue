<template>
  <li data-testid="todo-item" :class="{ 'completed': todo.done, 'editing': isEditing }">
    <div class="view">
      <input v-model="todo.done" data-testid="todo-done" class="toggle" type="checkbox" />
      <label data-testid="todo-text" @dblclick="isEditing = true">{{ todo.text }}</label>
      <button data-testid="delete" class="destroy" @click="$emit('delete-todo', todo.id)"></button>
    </div>
    <input v-focus="todo.text" data-testid="todo-edit" class="edit" :value="todo.text" @blur="isEditing = false" @keyup.enter="handleEditTodo" />
  </li>
</template>
<script setup lang="ts">
import { ref, type DirectiveBinding } from 'vue'
interface TodoItem {
  id: number
  text: string
  done: boolean
}

interface Props {
  todo: TodoItem
}

const props = withDefaults(defineProps<Props>(), {
  todo: () => ({} as TodoItem),
})

const emit = defineEmits<{
  (e: 'delete-todo', id: number): void
  (e: 'edit-todo', data: { id: number; text: string }): void
}>()

const isEditing = ref(false)

const vFocus = (el: HTMLInputElement, binding: DirectiveBinding<string>) => {
  if (binding.value) {
    el.focus()
  }
}

function handleEditTodo(e: KeyboardEvent) {
  emit('edit-todo', {
    id: props.todo.id,
    text: (e.target as HTMLInputElement).value
  })
}
</script>
