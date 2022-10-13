<template>
  <div class="character">
    <character-info />
    <character-stats />
    <character-items />
    <character-hirelings />
  </div>
</template>

<script setup lang="ts">
import CharacterInfo from "./sheet/CharacterAbout.vue";
import CharacterStats from "./sheet/CharacterInfo.vue";
import CharacterItems from "./sheet/CharacterItems.vue";
import CharacterHirelings from "./sheet/CharHirelingList.vue";
</script>

<style lang="scss">
.character {
  width: 620px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 100%;
  overflow: scroll;
}
</style>
