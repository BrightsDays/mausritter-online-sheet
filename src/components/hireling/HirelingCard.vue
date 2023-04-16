<template>
  <div class="hireling">
    <div class="header">
      <h3 class="heading">
        {{ props.hireling.name }} (Level {{ props.hireling.level }})
      </h3>
      <button
        class="remove"
        @click="removeHireling(props.hireling.index)"
      >
        remove
      </button>
    </div>
    <div class="details">
      Look: {{ props.hireling.details }}
    </div>
    <div class="wrapper">
      <CharStats
        :stats="props.hireling.stats"
        :hireling-index="props.hireling.index"
        @grow-stat="growStat($event)"
        @down-stat="downStat($event)"
      />
      <CharInventory
        :body-back="props.hireling.bodyBack"
        :pack-back="props.hireling.packBack"
        :hireling-index="props.hireling.index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CharStats from '../character/CharStats.vue'
import CharInventory from '../character/CharInventory.vue'
import { useCharacterStore } from '../../store/character'
import { usePopupStore } from '../../store/popup'
import { ChangeStatEvent } from '../../types/index'

const characterStore = useCharacterStore()
const popupStore = usePopupStore()

const props = defineProps({
  hireling: {
    type: Object,
    required: true
  }
})

const growStat = (event: ChangeStatEvent) => {
  const target = characterStore.hirelings[props.hireling.index].stats[event.stat]

  if (target && target.current < event.maxValue) {
    characterStore.setHirelingStat(event.stat, +target.current + 1, props.hireling.index)
  }
}

const downStat = (event: ChangeStatEvent) => {
  const target = characterStore.hirelings[props.hireling.index].stats[event.stat]
  
  if (target && target.current > 0) {
    characterStore.setHirelingStat(event.stat, +target.current - 1, props.hireling.index)
  }
}

const removeHireling = (index: number) => {
  popupStore.setPopup('removeHireling')
  characterStore.setHirelingIndex(index)
}
</script>

<style lang="scss" scoped>
.hireling {
  padding-top: 10px;
  text-align: left;
  border-top: 2px solid var(--second);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .heading {
    display: inline-block;
    font-family: "Pirata One", sans-serif;
    font-size: 2.6em;
    font-weight: normal;
    line-height: 1;
    color: var(--main);
  }

  .wrapper {
    display: flex;
    margin-top: 10px;
    gap: 15px;
  }

  .details {
    margin-top: 10px;
    font-family: "Ubuntu", sans-serif;
    font-size: 1.6em;
    color: var(--second);
  }

  .remove {
    padding: 5px 10px;
    font-family: "Ubuntu", sans-serif;
    font-size: 1.3em;
    font-weight: bold;
    color: var(--main);
    border: 2px solid var(--main);
    border-radius: 15px;
    cursor: pointer;

    &:hover {
      background: var(--second-background);
    }
  }
}
</style>