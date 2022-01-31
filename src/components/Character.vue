<template>
  <div class="character">
    <character-info />
    <div class="stats">

    </div>
    <div class="inventory">

    </div>
    <div class="conditions">

    </div>
  </div>
</template>

<script>
import CharacterInfo from "./CharacterInfo.vue";

export default {
  components: {CharacterInfo}
}
</script>

<style lang="scss">
.character {
  margin: 60px auto 0;
  width: 600px;
}
</style>
