<template>
  <div class="info">
    <div class="info__description">
      <label class="description-input__label">Portrait/description</label>
    </div>
    <div class="info__stats">
      <div class="exp-input">
        <label class="exp-input__label">Level / Exp</label>
        <input
            class="exp-input__input exp-input__level"
            v-model="level"
            readonly
        />
        <span class="exp-input__devider">/</span>
        <input
            class="exp-input__input exp-input__exp"
            v-model="exp"
            @input="changeStat('exp', $event)"
        />
      </div>
      <stats />
    </div>
  </div>
</template>

<script setup lang="ts">
import Stats from './Stats.vue'
import {useStore} from 'vuex'
import {computed} from 'vue'
import changeStat from '../../plugins/changeStat'

const store = useStore()

const exp = computed(() => store.state.exp)
const level = computed(() => {
  let result = 1

  if (exp.value >= 1000) result = 2
  if (exp.value >= 3000) result = 3
  if (exp.value >= 6000) result = 3 + Math.floor(exp.value / 6000)

  return result
})
</script>

<style lang="scss">
.info {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 15px;

  &__description {
    width: 60%;
    border: 2px dashed var(--second);
    border-radius: 10px;
  }

  &__stats {
    width: 40%;
  }
}

.exp-input {
  display: flex;
  margin: 0 0 60px;
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
    width: 20%;
  }

  &__exp {
    width: 45%;
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
