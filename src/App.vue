<template>
  <app-index />
</template>

<script setup lang="ts">
import AppIndex from './components/AppIndex.vue'
</script>

<style lang="scss">
.app {
  display: flex;
  width: 900px;
  height: calc(100vh - 40px);
  justify-content: space-between;
  margin: 20px auto;
  font-family: 'Ubuntu', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  gap: 15px;
}
</style>
