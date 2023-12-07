<template>
  <div class="hireling">
    <div class="header">
      <h3 class="heading">
        {{ hireling.name }}
      </h3>
      <button
        v-if="typeof hireling.index === 'number'"
        class="remove"
        @click="removeHireling(hireling.index)"
      >
        Remove
      </button>
    </div>
    <!-- <div class="level">
      <span class="details big">
        Level: {{ hireling.level }}
      </span>
      <span class="details big">
        Experience: {{ hireling.exp }}
      </span>
      <UiButton
        type="simple"
        text="Add exp"
        disabled
      />
    </div> -->
    <div class="details">
      Look: {{ hireling.details }}
    </div>
    <div class="wrapper">
      <CharStats
        :stats="hireling.stats"
        :hireling-index="hireling.index"
        @grow-stat="growStat($event)"
        @down-stat="downStat($event)"
      />
      <CharInventory
        :body-back="hireling.bodyBack"
        :pack-back="hireling.packBack"
        :hireling-index="hireling.index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CharStats from '../character/CharStats.vue'
import CharInventory from '../character/CharInventory.vue'
import { useCharacterStore } from '../../store/character'
import { usePopupStore } from '../../store/popup'
import { SimpleCard } from '../../types/cards'
import { ChangeStatEvent } from '../../types/character'
// import UiButton from '../ui/UiButton.vue'

const characterStore = useCharacterStore()
const popupStore = usePopupStore()

const {
  hireling
} = defineProps<{
  hireling: SimpleCard
}>()

const growStat = (event: ChangeStatEvent) => {
  if (typeof hireling.index === 'number') {
  const target = characterStore.hirelings[hireling.index].stats[event.stat]

  if (target && target.current < event.maxValue) {
    characterStore.setHirelingStat(event.stat, +target.current + 1, hireling.index)
  }
  }
}

const downStat = (event: ChangeStatEvent) => {
  if (typeof hireling.index === 'number') {
    const target = characterStore.hirelings[hireling.index].stats[event.stat]
    
    if (target && target.current > 0) {
      characterStore.setHirelingStat(event.stat, +target.current - 1, hireling.index)
    }
  }
}

const removeHireling = (index: number | undefined) => {
  if (typeof index === 'number') {
    popupStore.setPopup('removeHireling')
    characterStore.setHirelingIndex(index)
  }
}
</script>

<style lang="scss" scoped>
.hireling {
  padding-top: 10px;
  text-align: left;
  border-top: 2px solid var(--second);

  .header,.level {
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    .heading {
      display: inline-block;
      font-family: "Pirata One", sans-serif;
      font-size: 2.6em;
      font-weight: normal;
      line-height: 1;
      color: var(--main);
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

    &.big {
      font-size: 2em;
      line-height: 1;
      color: var(--main);
    }
  }
}
</style>