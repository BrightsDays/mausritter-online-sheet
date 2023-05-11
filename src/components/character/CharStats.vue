<template>
  <div class="stats">
    <span class="stats__info stats__max">Max</span>
    <span class="stats__info stats__current">Current</span>
    <div class="stats__list">
      <div
        v-for="item in props.stats"
        :key="item.name"
        class="stats__item"
        :class="item.name === 'hp' && 'stats__hp'"
      >
        <label class="stats__label">{{ item.name }}</label>
        <input
          v-model="item.max"
          type="number"
          class="stats__input"
          readonly
        >
        <input
          v-model="item.current"
          type="number"
          class="stats__input"
          readonly
        >
        <div class="stat-buttons">
          <button
            class="stat-buttons__button stat-buttons__button--grow"
            @click="growStat(item.name, item.max)"
          >
            <p>+</p>
          </button>
          <button
            class="stat-buttons__button stat-buttons__button--down"
            @click="downStat(item.name)"
          >
            <p>-</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StatKeys } from '../../types/character'

const props = defineProps({
  stats: {
    type: Object,
    required: true
  },
  hirelingIndex: {
    type: Number,
    required: false,
    default: null
  }
})

const emit = defineEmits(['growStat', 'downStat'])

const growStat = (stat: StatKeys, maxValue: number) => {
  emit('growStat', { stat, maxValue })
}

const downStat = (stat: StatKeys) => {
  emit('downStat', { stat })
}
</script>

<style lang="scss">
.stats {
  position: relative;
  padding-top: 20px;

  &__info {
    position: absolute;
    top: 0;
    font-family: 'Ubuntu', sans-serif;
    color: var(--second);
    font-size: 1.4em;
    line-height: 1;
  }

  &__max {
    right: 100px;
  }

  &__current {
    right: 25px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    border: 2px solid var(--main);
    border-radius: 10px;
    overflow: hidden;
  }

  &__hp {
    border-top: 2px solid var(--main);
  }

  &__item {
    display: flex;
  }

  &__label {
    display: inline-block;
    width: 40%;
    padding: 10px;
    font-family: 'Pirata One', sans-serif;
    font-size: 4em;
    line-height: 1;
    color: var(--main);
    background-color: var(--second-background);
    text-transform: uppercase;
  }

  &__input {
    width: 30%;
    padding: 10px 10px 5px 10px;
    border: none;
    font-family: 'Cookie', sans-serif;
    font-size: 4em;
    line-height: 1;
    color: var(--main);
    outline: none;
    text-align: center;
    
    &::-webkit-inner-spin-button {
      appearance: none;
    }

    &[type=number] {
      -moz-appearance:textfield;
    }

    &:nth-child(3) {
      color: var(--special);
      box-shadow: -5px 0px 0px -3px var(--main);
    }
  }
}

.stat-buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;

  &__button {
    display: flex;
    justify-content: center;
    padding: 0;
    width: 25px;
    height: 25px;
    color: var(--main);
    border: 2px solid var(--main);
    cursor: pointer;

    p {
      margin-top: -2px;
      font-family: 'Ubuntu', sans-serif;
      font-size: 2em;
      font-weight: bold;
      background: none;
    }

    &--grow {
      border-radius: 10px 10px 0 0;
      border-bottom: 1px solid var(--main);
    }

    &--down {
      border-radius: 0 0 10px 10px;
      border-top: 1px solid var(--main);
    }

    &:hover {
      background-color: var(--second-background);
    }
  }
}
</style>
