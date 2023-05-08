<template>
  <div
    v-if="warband"
    class="warband"
  >
    <div class="header">
      <h3 class="heading">
        Warband (Level {{ warband.level }})
      </h3>
      <button
        class="remove"
        @click="popupStore.setPopup('disbandWarband')"
      >
        disband
      </button>
    </div>
    <div class="details">
      Your warband is formed by 20 fighting mice, plus one follower (luggage porter, cook, armourer) for every fighter.
    </div>
    <UiDrop :width="243" />
    <div
      class="wrapper"
    >
      <CharStats
        :stats="warband.stats"
        @grow-stat="growStat($event)"
        @down-stat="downStat($event)"
      />
      <CharInventory
        :body-back="warband.bodyBack"
        :pack-back="warband.packBack"
        is-warband="warband"
      />
    </div>
  </div>
  <div
    v-else
    class="warband column"
  >
    <span class="details">
      You have not formed warband.
    </span>
    <UiButton
      text="Form warband"
      :type="'big'"
      @click="popupStore.setPopup('formWarband')"
    />
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '../../store/character'
import { ChangeStatEvent } from '../../types'
import CharStats from '../character/CharStats.vue'
import CharInventory from '../character/CharInventory.vue'
import { usePopupStore } from '../../store/popup'
import UiDrop from '../ui/UiDrop.vue'
import UiButton from '../ui/UiButton.vue'

const { warband } = $(useCharacterStore())
const characterStore = useCharacterStore()
const popupStore = usePopupStore()

const growStat = (event: ChangeStatEvent) => {
  const target = warband?.stats[event.stat]

  if (target && target.current < event.maxValue) {
    characterStore.setWarbandStat(event.stat, +target.current + 1)
  }
}

const downStat = (event: ChangeStatEvent) => {
  const target = warband?.stats[event.stat]
  
  if (target && target.current > 0) {    
    characterStore.setWarbandStat(event.stat, +target.current - 1)
  }
}
</script>

<style lang="scss" scoped>
.warband {
  padding-top: 10px;
  text-align: left;

  &.column {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .heading {
    display: inline-block;
    font-family: "Pirata One", sans-serif;
    font-size: 4em;
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