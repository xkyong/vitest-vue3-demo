<template>
  <header class="header">
    <h1>todos</h1>
    <input
      class="new-todo"
      placeholder="What needs to be done?"
      autofocus
      data-testid="new-todo"
      @keyup.enter="handleNewTodo"
    />
  </header>
</template>
<script setup lang="ts">

const emit = defineEmits(['new-todo'])

function handleNewTodo(e: KeyboardEvent) {
  const inputEl = e.target as HTMLInputElement
  const value = inputEl.value.trim()
  if (!value.length) return
  emit('new-todo', value)
  inputEl.value = ''
}
</script>
