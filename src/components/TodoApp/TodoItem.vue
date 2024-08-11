<template>
  <li data-testid="todo-item" :class="{ 'completed': todo.done }">
    <div class="view">
      <input v-model="todo.done" data-testid="todo-done" class="toggle" type="checkbox" />
      <label data-testid="todo-text">{{ todo.text }}</label>
      <button data-testid="delete" class="destroy" @click="$emit('delete-todo', todo.id)"></button>
    </div>
    <input class="edit" value="Rule the web" />
  </li>
</template>
<script setup lang="ts">
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
}>()
</script>
