<template>
  <div class="app">
    <main-menu />
    <character-list />
  </div>
</template>

<script setup lang="ts">
import MainMenu from './components/MainMenu.vue'
import CharacterList from './components/CharacterList.vue'
</script>

<style lang="scss">
.app {
  display: flex;
  width: 900px;
  height: 776px;
  justify-content: space-between;
  margin: 30px auto 0;
  font-family: 'Ubuntu', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  gap: 15px;
}
</style>
