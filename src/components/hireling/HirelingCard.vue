<template>
  <div class="hirelings-item">
    <div class="hirelings-item__header">
      <h3 class="hirelings-item__heading">
        {{ props.hireling.name }}
      </h3>
      <button
        class="hirelings-item__remove"
        @click="removeHireling(props.hireling.index)"
      >
        remove
      </button>
    </div>
    <div class="hirelings-item__details">
      Look: {{ props.hireling.details }}
    </div>
    <div class="hirelings-item__wrapper">
      <CharStats
        :stats="props.hireling.stats"
        :hireling-index="props.hireling.index"
        @grow-stat="growStat($event)"
        @down-stat="downStat($event)"
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
import CharStats from '../character/CharStats.vue'
import CharInventory from '../character/CharInventory.vue'
import { useCharacterStore } from '../../store/character'
import { usePopupStore } from '../../store/popup'
import { ChangeStatEvent } from '../../types'

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

<style lang="scss">
.hirelings-item {
  padding-top: 10px;
  text-align: left;
  border-top: 2px solid var(--second);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

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

  &__details {
    margin-top: 10px;
    font-family: "Ubuntu", sans-serif;
    font-size: 1.6em;
    color: var(--second);
  }

  &__remove {
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