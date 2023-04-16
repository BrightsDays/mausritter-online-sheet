<template>
  <div class="info">
    <div
      class="portrait"
      :class="{ 'uploaded': characterStore.portrait }"
      :style="{ backgroundImage: `url(${characterStore.portrait})` }"
    >
      <input
        id="upload"
        ref="upload"
        type="file"
        class="input"
        accept="image/png, image/jpeg"
        @change="uploadImage($event as InputEvent)"
      >
      <label
        v-if="!characterStore.portrait"
        for="upload"
        class="label"
      >
        Upload portrait (up to 2 MB)
      </label>
      <button
        v-if="characterStore.portrait"
        class="clear"
        @click.prevent="characterStore.setPortrait(null)"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L8 8M15 15L8 8M8 8L15 1L1 15"
            stroke="#272727"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
    <div class="info__stats">
      <div class="exp-input">
        <label class="exp-input__label">Level / Exp</label>
        <input
          v-model="characterStore.level"
          class="exp-input__input exp-input__level"
          readonly
        >
        <span class="exp-input__devider">/</span>
        <input
          v-model="characterStore.exp"
          class="exp-input__input exp-input__exp"
          readonly
        >
        <button
          class="exp-input__add"
          :disabled="!characterStore.name"
          @click="levelUp"
        >
          <p>+</p>
        </button>
      </div>
      <char-stats
        :stats="characterStore.stats"
        @grow-stat="growStat($event)"
        @down-stat="downStat($event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '../../store/character'
import CharStats from '../character/CharStats.vue'
import { usePopupStore } from '../../store/popup'
import { useNotificationsStore } from '../../store/notifications'
import { ChangeStatEvent } from '../../types'

const characterStore = useCharacterStore()
const popup = usePopupStore()
const notificationStore = useNotificationsStore()

const levelUp = () => popup.setPopup('levelUp')

const uploadImage = (event: InputEvent) => {
  const files = (event.target as HTMLInputElement).files
  const reader = new FileReader()

  if (files && files.length > 0 && files[0].size / 1024 ** 2 > 2) {
    notificationStore.setNotification({
      type: 'error',
      message: `Your file is to big`
    })

    return
  }

  reader.onload = () => {
    if (reader.result) characterStore.setPortrait(reader.result.toString())
  }

  if (files && files[0]) {
    reader.readAsDataURL(files[0])
  }
}

const growStat = (event: ChangeStatEvent) => {
  const target = characterStore.stats[event.stat]
  if (target && target.current < event.maxValue) {
    characterStore.setStat(event.stat, +target.current + 1)
  }
}

const downStat = (event: ChangeStatEvent) => {
  const target = characterStore.stats[event.stat]
  if (target && target.current > 0) {    
    characterStore.setStat(event.stat, +target.current - 1)
  }
}
</script>

<style lang="scss" scoped>
.info {
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 15px;

  .portrait {
    position: relative;
    width: 60%;
    border: 2px dashed var(--second);
    border-radius: 10px;
    background-repeat: no-repeat;
    background-size: cover;

    &.uploaded {
      border: 2px solid var(--main);
    }

    .input {
      outline: none;
      appearance: none;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }

    .label {
      position: absolute;
      display: inline-block;
      width: 100%;
      left: 0;
      top: 30%;
      font-family: 'Ubuntu', sans-serif;
      color: var(--second);
      font-size: 1.7em;
      pointer-events: none;
    }

    .clear {
      display: flex;
      position: absolute;
      top: 5px;
      right: 5px;
      width: 25px;
      height: 25px;
      justify-content: center;
      align-items: center;
      background-color: var(--background);
      border: none;
      border-radius: 5px;
      opacity: 0.6;
      cursor: pointer;

      svg path {
        stroke: var(--main);
      }

      &:hover {
        opacity: 1;
      }
    }
  }

  &__stats {
    width: 40%;
  }

  &__hireling {
    position: absolute;
    left: 10px;
    bottom: 10px;
    width: 120px;
    height: 120px;
    border: 2px solid var(--second);
    border-radius: 5px;
  }
}

.exp-input {
  display: flex;
  margin: 0 0 5px;
  align-items: center;
  border: 2px solid var(--main);
  border-radius: 10px;
  overflow: hidden;

  &__label {
    width: 45%;
    padding: 10px;
    font-size: 1.4em;
    color: var(--main);
    background-color: var(--second-background);
  }

  &__input {
    padding: 8px;
    font-family: 'Cookie', sans-serif;
    font-size: 1.8em;
    line-height: 1;
    color: var(--main);
    outline: none;
    border: none;
    text-align: center;
  }

  &__level {
    width: 15%;
  }

  &__exp {
    width: 40%;
  }

  &__add {
    display: flex;
    justify-content: center;
    margin-right: 5px;
    flex: 0 0 25px;
    width: 25px;
    height: 25px;
    color: var(--main);
    text-align: center;
    border: 2px solid var(--main);
    border-radius: 50%;
    cursor: pointer;

    p {
      margin-top: -2px;
      font-family: 'Ubuntu', sans-serif;
      font-size: 2em;
      font-weight: bold;
      background: none;
    }

    &:hover {
      background-color: var(--second-background);
    }
  }

  &__devider {
    font-size: 1.8em;
    color: var(--main);
  }
}
</style>
