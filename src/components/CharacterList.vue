<template>
  <div class="character">
    <character-info />
    <character-stats />
    <character-items />
  </div>
</template>

<script setup lang="ts">
import CharacterInfo from "./sheet/CharacterAbout.vue";
import CharacterStats from "./sheet/CharacterInfo.vue";
import CharacterItems from "./sheet/CharacterItems.vue";
</script>

<style lang="scss">
.character {
  width: 620px;
}
</style>
