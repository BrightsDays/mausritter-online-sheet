<template>
  <aside class="menu">
    <div class="menu__header">
      <h1 class="menu__heading">Character Sheet v.0.0.0</h1>
<!--      <button-->
<!--          class="menu__toggle"-->
<!--          @click="changeColorMode()"-->
<!--      />-->
    </div>
    <div class="menu__cards">
      <ui-details title="Items">

      </ui-details>
      <ui-details title="Conditions">

      </ui-details>
    </div>
    <div class="menu__bank">
      <ui-details title="Banked items">

      </ui-details>
    </div>
  </aside>
</template>

<script setup lang="ts">
import UiDetails from "./ui/uiDetails.vue"
</script>

<style lang="scss">
.menu {
  width: 250px;

  &__header {
    padding: 15px;
    border-bottom: 1px solid var(--main);
    text-align: left;
  }

  &__heading {
    color: var(--main);
    font-size: 1.4em;
  }

  &__cards {
    border-bottom: 1px solid var(--main);
  }
}
</style>
