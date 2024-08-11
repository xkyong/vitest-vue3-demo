<template>
  <section class="todoapp">
    <TodoHeader @new-todo="handleNewTodo"/>
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox" />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <!-- These are here just to show the structure of the list items -->
        <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
        <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" @delete-todo="handleDeleteTodo" />
      </ul>
    </section>
    <!-- This footer should be hidden by default and shown when there are todos -->
    <TodoFooter />
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TodoHeader from './TodoHeader.vue'
import TodoFooter from './TodoFooter.vue'
import TodoItem from './TodoItem.vue'

interface TodoItem {
  id: number
  text: string
  done: boolean
}

const todos = ref<TodoItem[]>([])

function handleNewTodo(text: string) {
  const endTodo = todos.value[todos.value.length - 1]
  todos.value.push({
    id: endTodo ? endTodo.id + 1 : 1,
    text,
    done: false
  })
}

function handleDeleteTodo(id: number) {
  todos.value = todos.value.filter(todo => todo.id !== id)
}

defineExpose({
  todos,
  handleNewTodo,
  handleDeleteTodo
})
</script>
