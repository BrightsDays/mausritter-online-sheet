<template>
  <BlockMobile v-if="isMobile()" />
  <app-index v-else />
</template>

<script setup lang="ts">
import AppIndex from './components/AppIndex.vue'
import BlockMobile from './components/BlockMobile.vue'

const isMobile = () => screen.width <= 760
</script>

<style lang="scss">
.app {
  display: flex;
  width: 900px;
  height: 100svh;
  justify-content: space-between;
  margin: 0 auto;
  font-family: 'Ubuntu', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  gap: 15px;
}
</style>
