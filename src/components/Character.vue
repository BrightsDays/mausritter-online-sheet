<template>
  <div class="character">
    <character-info />
    <character-stats />
    <character-items />
    <div class="conditions">

    </div>
  </div>
</template>

<script setup lang="ts">
import CharacterInfo from "./CharacterInfo.vue";
import CharacterStats from "./CharacterStats.vue";
import CharacterItems from "./CharacterItems.vue";
</script>

<style lang="scss">
.character {
  margin: 60px auto 0;
  width: 620px;
}
</style>
