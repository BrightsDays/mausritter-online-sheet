<template>
  <div class="character">
    <character-info />
    <character-stats />
    <character-items />
    <character-hirelings />
  </div>
</template>

<script setup lang="ts">
import CharacterInfo from "./CharAbout.vue";
import CharacterStats from "./CharInfo.vue";
import CharacterItems from "./CharItems.vue";
import CharacterHirelings from "./CharHirelingList.vue";
</script>

<style lang="scss">
.character {
  width: 626px;
  display: flex;
  padding-right: 4px;
  flex-direction: column;
  gap: 15px;
  max-height: 100%;
  overflow-y: scroll;
}
</style>
