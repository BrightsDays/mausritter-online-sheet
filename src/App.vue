<template>
  <div class="app">
    <main-menu />
    <character />
  </div>
</template>

<script setup lang="ts">
import Character from './components/Character.vue'
import MainMenu from './components/MainMenu.vue'
</script>

<style lang="scss">
.app {
  display: flex;
  width: 900px;
  justify-content: space-between;
  margin: 60px auto 0;
  font-family: 'Ubuntu', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  gap: 15px;
}
</style>
