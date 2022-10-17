<template>
  <div class="info">
    <div class="info__description">
      <label class="description-input__label">Portrait</label>
    </div>
    <div class="info__stats">
      <div class="exp-input">
        <label class="exp-input__label">Level / Exp</label>
        <input
          v-model="level"
          class="exp-input__input exp-input__level"
          readonly
        >
        <span class="exp-input__devider">/</span>
        <input
          v-model="store.exp"
          class="exp-input__input exp-input__exp"
          readonly
        >
        <button
          class="exp-input__add"
          @click="levelUp"
        >
          +
        </button>
      </div>
      <char-stats :stats="store.stats" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '../../store/character'
import { computed } from 'vue'
import CharStats from '../tables/CharStats.vue'
import { usePopupStore } from '../../store/popup';

const store = useCharacterStore()
const popup = usePopupStore()

const level = computed(() => {
  let result = 1

  if (store.exp >= 1000) result = 2
  if (store.exp >= 3000) result = 3
  if (store.exp >= 6000) result = 4 + Math.floor((store.exp - 6000) / 5000)

  return result
})

const levelUp = () => popup.setPopup('levelUp')
</script>

<style lang="scss">
.info {
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 15px;

  &__description {
    width: 60%;
    border: 2px dashed var(--second);
    border-radius: 10px;
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
    margin-right: 5px;
    flex: 0 0 25px;
    width: 25px;
    height: 25px;
    font-size: 2em;
    font-weight: bold;
    color: var(--main);
    border: 2px solid var(--main);
    border-radius: 50%;
    cursor: pointer;
  }

  &__devider {
    font-size: 1.8em;
    color: var(--main);
  }
}

.description-input {
  &__label {
    display: inline-block;
    font-family: 'Ubuntu', sans-serif;
    color: var(--second);
    font-size: 1.7em;
    line-height: 1;
    margin-top: 5px;
  }
}
</style>
