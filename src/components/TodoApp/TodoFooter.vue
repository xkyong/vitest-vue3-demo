<template>
  <footer class="footer">
    <!-- This should be `0 items left` by default -->
    <span class="todo-count"
      ><strong data-testid="done-todos-count">{{ doneTodosCount }}</strong> item
      left</span
    >
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li>
        <RouterLink to="/">All</RouterLink>
      </li>
      <li>
        <RouterLink to="/active">Active</RouterLink>
      </li>
      <li>
        <RouterLink to="/completed">Completed</RouterLink>
      </li>
    </ul>
    <!-- Hidden if no completed items are left ↓ -->
    <button
      v-if="clearBtnVisible"
      data-testid="clear-completed"
      class="clear-completed"
      @click="$emit('clear-completed')"
    >
      Clear completed
    </button>
  </footer>
</template>
<script setup lang="ts">
import { computed } from 'vue'

interface TodoItem {
  id: number
  text: string
  done: boolean
}

interface Props {
  todos: TodoItem[]
}

const props = withDefaults(defineProps<Props>(), {
  todos: () => [] as TodoItem[],
})

const emit = defineEmits(['clear-completed'])

const doneTodosCount = computed(
  () => props.todos.filter((todo) => !todo.done).length
)

const clearBtnVisible = computed(() => props.todos.some((todo) => todo.done))
</script>
