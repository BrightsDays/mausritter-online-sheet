<template>
  <div class="hirelings-item">
    <h3 class="hirelings-item__heading">
      {{ props.hireling.name }}
    </h3>
    <div class="hirelings-item__wrapper">
      <char-stats
        :stats="props.hireling.stats"
        :hireling-index="props.hireling.index"
      />
      <char-inventory
        :body-back="props.hireling.bodyBack"
        :pack-back="props.hireling.packBack"
        :hireling-index="props.hireling.index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CharStats from '../tables/CharStats.vue'
import CharInventory from '../tables/CharInventory.vue';

const props = defineProps({
  hireling: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss">
.hirelings-item {
  padding-top: 10px;
  text-align: left;
  border-top: 2px solid var(--second);

  &__heading {
    display: inline-block;
    font-family: "Pirata One", sans-serif;
    font-size: 2.6em;
    font-weight: normal;
    line-height: 1;
    color: var(--main);
  }

  &__wrapper {
    display: flex;
    margin-top: 10px;
    gap: 15px;
  }
}
</style>