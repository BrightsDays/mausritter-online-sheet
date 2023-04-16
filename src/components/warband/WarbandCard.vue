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
    <div
      v-if="characterStore.warband" 
      class="hirelings-item__wrapper"
    >
      <CharStats
        :stats="characterStore.warband.stats"
        @grow-stat="growStat($event)"
        @down-stat="downStat($event)"
      />
      <CharInventory
        :body-back="characterStore.warband.bodyBack"
        :pack-back="characterStore.warband.packBack"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '../../store/character'
import { ChangeStatEvent } from '../../types'
import CharStats from '../character/CharStats.vue'
import CharInventory from '../character/CharInventory.vue'

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