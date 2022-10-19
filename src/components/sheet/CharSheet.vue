<template>
  <div class="character">
    <character-info />
    <character-stats />
    <character-items />
    <character-hirelings />
  </div>
</template>

<script setup lang="ts">
import CharacterInfo from "./CharacterAbout.vue";
import CharacterStats from "./CharacterInfo.vue";
import CharacterItems from "./CharacterItems.vue";
import CharacterHirelings from "./CharHirelingList.vue";
</script>

<style lang="scss">
.character {
  width: 620px;
  display: flex;
  padding-right: 4px;
  flex-direction: column;
  gap: 15px;
  max-height: 100%;
  overflow-y: scroll;
}
</style>
