<template>
  <header class="items__header">
    <h2 class="items__heading">Inventory</h2>
    <div
      class="drop-input"
      @drop="event => dropItem(event, 'bodyBack')"
      @dragover="allowDrop"
      @dragleave="leaveDrag"
    >
      <label class="drop-input__label">Drop item</label>
    </div>
    <div class="grit-input">
      <label class="grit-input__label">Grit</label>
      <input
          class="grit-input__input"
             v-model="grit"
             readonly
      />
      <span class="grit-input__devider">/ </span>
      <input
          class="grit-input__input"
          v-model="maxGrit"
          readonly
      />
    </div>
    <div class="pips-input">
      <label class="pips-input__label">Pips</label>
      <input
          class="pips-input__input"
          v-model="pips"
          @click="changeStat('pips', $event)"
      />
    </div>
  </header>
  <inventory />
</template>

<script setup lang="ts">
import Inventory from './Inventory.vue'
import { useStore } from '../../store/character'
import { computed } from 'vue'
import changeStat from '../../plugins/changeStat'

const store = useStore()

const pips = computed(() => store.pips)
const grit = computed(() => store.grit)
const exp = computed(() => store.exp)

const bodyBack = computed(() => store.bodyBack)
const packBack = computed(() => store.packBack)

const maxGrit = computed(() => {
  let result = 0

  if (exp.value >= 1000) result = 1
  if (exp.value >= 3000) result = 2
  if (exp.value >= 6000) result = 2 + Math.floor(exp.value / 6000)

  return result
})

const allowDrop = (event: DragEvent) => {
  event.preventDefault();
  (event.target as HTMLElement).classList.add('droppable')
}

const leaveDrag = (event: DragEvent) => {
  event.preventDefault();
  (event.target as HTMLElement).classList.remove('droppable')
}

const dropItem = (event: DragEvent, type: string) => {
  event.preventDefault()

  if (event.dataTransfer) {
    const slotId = event.dataTransfer.getData('id')
  
    if (slotId) {
      if (Object.keys(bodyBack.value).includes(slotId)) {      
        store.updateItems('bodyBack', {
          ...bodyBack.value,
          [slotId]: {
            name: slotId,
            item: null
          }
        })
      }

      if (Object.keys(packBack.value).includes(slotId)) {
        store.updateItems('packBack', {
          ...packBack.value,
          [slotId]: {
            name: slotId,
            item: null
          }
        })
      }
    }

    (event.target as HTMLElement).classList.remove('droppable')
  }
}
</script>

<style lang="scss">
.items {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0;
    gap: 15px;
  }

  &__heading {
    display: inline-block;
    font-family: 'Pirata One', sans-serif;
    font-size: 4em;
    font-weight: normal;
    line-height: 1;
    color: var(--main);
  }
}

.pips-input,.grit-input,.drop-input {
  position: relative;
  border: 2px solid var(--main);
  font-family: 'Ubuntu', sans-serif;
  color: var(--main);

  &:after {
    content: '/ 250';
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.4em;
  }

  &__label {
    display: inline-block;
    padding: 10px;
    font-size: 1.4em;
    background: var(--second-background);
  }

  &__input {
    display: inline-block;
    width: 80px;
    padding: 8px 45px 8px 10px;
    color: var(--main);
    font-family: 'Ubuntu', sans-serif;
    text-align: center;
    font-size: 1.4em;
    border: none;
    outline: none;
  }
}

.drop-input {
  margin-left: auto;

  &__label {
    background: var(--background);
  }
  
  &:after {
    content: '';
  }
}

.grit-input {
  &:after {
    content: '';
  }

  &__input {
    width: 29px;
    padding: 8px 0px;
  }

  &__devider {
    font-size: 1.4em;
    color: var(--main);
  }
}
</style>
