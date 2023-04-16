<template>
  <div class="hirelings-item">
    <div class="hirelings-item__header">
      <h3 class="hirelings-item__heading">
        Warband
      </h3>
      <button
        class="hirelings-item__remove"
      >
        disband
      </button>
    </div>
    <div class="hirelings-item__wrapper">
      <CharStats
        v-if="characterStore.warband"
        :stats="characterStore.warband.stats"
        @grow-stat="growStat($event)"
        @down-stat="downStat($event)"
      />
      <!-- <char-inventory
        :body-back="props.hireling.bodyBack"
        :pack-back="props.hireling.packBack"
        :hireling-index="props.hireling.index"
      /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '../../store/character'
import { ChangeStatEvent } from '../../types'
import CharStats from '../character/CharStats.vue'

const characterStore = useCharacterStore()

const growStat = (event: ChangeStatEvent) => {
  const target = characterStore.warband?.stats[event.stat]

  if (target && target.current < event.maxValue) {
    characterStore.setWarbandStat(event.stat, +target.current + 1)
  }
}

const downStat = (event: ChangeStatEvent) => {
  const target = characterStore.warband?.stats[event.stat]
  
  if (target && target.current > 0) {    
    characterStore.setWarbandStat(event.stat, +target.current - 1)
  }
}
</script>

<style lang="scss" scoped>

</style>