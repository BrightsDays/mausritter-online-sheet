<template>
  <div class="inventory">
    <div class="body-items">
      <div class="body-items__item" v-for="item in bodyBack" :key="item">
        <span class="body-items__name">{{ item.name }}</span>
      </div>
    </div>
    <div class="pack-items">
      <div
        class="pack-items__back" 
        v-for="item in packBack"
        :key="item.name"
        :id="item.name.toString()"
        @drop="drop"
        @dragover="allowDrop"
        >
        <span v-if="!item.item" class="pack-items__name">{{ item.name }}</span>
        <div
          v-else
          class="pack-items__item items__item"
          >
          <span class="items__title">{{ findItem(item.item)?.title }}</span>
          <div class="items__status">
            <ui-item-checkbox />
            <span v-if="findItem(item.item)?.stat" class="items__stat">{{ findItem(item.item)?.stat }}</span>
          </div>
          <span class="items__type">{{ findItem(item.item)?.type }}</span>
        </div>

        <!-- <div
              v-if="item.group === 'conditions'"
              class="pack-items__item conditions__item"
          >
            <span class="conditions__title">{{ item.title}}</span>
            <span class="conditions__description">{{item.description}}</span>
            <span class="conditions__clear"><b class="conditions__clear">Clear:</b><br>{{item.clear}}</span>
          </div> -->
          
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../../store/pin'
import UiItemCheckbox from '../ui/UiItemCheckboxes.vue'
import itemsData from '../../data/itemsList.json'
import { Item } from '../../types';

const store = useStore()

const itemsList: Item[] = []
Object.values(itemsData).forEach(item => itemsList.push(item))

const findItem = (title: string): Item | null => {
  const findedItem = itemsList.filter(item => item.title === title)

  return findedItem[0] ? findedItem[0] : null
}

const bodyBack = store.bodyBack
const packBack = computed(() => store.packBack)

const allowDrop = (event: DragEvent) => event.preventDefault()

const drop = (event: DragEvent) => {
  event.preventDefault()

  let data = event.dataTransfer 
    ? event.dataTransfer.getData('text')
    : null

  if (data && event.target?.id) {
    const updatedPack = {
      ...packBack.value,
      [event.target.id]: {
        name: event.target.id,
        item: data
      }
    }
      
    store.updateItems(
      'packBack',
      updatedPack
    )
  }
}
</script>

<style lang="scss">
.inventory {
  display: flex;
  justify-content: space-between;
}

.body-items {
  display: grid;
  position: relative;
  grid-template-columns: 120px 120px;
  grid-template-rows: 120px 120px;
  border: 2px dashed var(--second);
  overflow: hidden;

  &__item {
    border: 2px dashed var(--second);
    margin: -2px;
  }

  &__name {
    display: inline-block;
    text-align: center;
    font-family: 'Pirata One', sans-serif;
    font-size: 2em;
    line-height: 1;
    color: var(--second);
    margin-top: 10px;
  }
}

.pack-items {
  position: relative;
  display: grid;
  grid-template-columns: 120px 120px 120px;
  grid-template-rows: 120px 120px;
  border: 2px solid var(--main);
  overflow: hidden;

  &__list {
    position: absolute;
    display: grid;
    grid-template-columns: 120px 120px 120px;
    grid-template-rows: 120px 120px;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: none;
  }

  &__item {
    border: 2px solid var(--main);
    margin: -2px;
  }

  &__back {
    border: 2px dashed var(--second);
    margin: -2px;
  }

  &__name {
    display: inline-block;
    text-align: center;
    font-family: 'Pirata One', sans-serif;
    font-size: 4em;
    line-height: 1;
    color: var(--second);
    margin-top: 40px;
  }
}
</style>
