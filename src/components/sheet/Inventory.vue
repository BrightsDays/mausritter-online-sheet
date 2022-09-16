<template>
  <div class="inventory">
    <div class="body-items">
      <div 
        class="body-items__item" 
        v-for="item in bodyBack"
        :key="item.name"
        :id="item.name.toString()"
        @drop="event => drop(event, 'bodyBack')"
        @dragover="allowDrop"
        @dragleave="leaveDrag"
      >

        <span v-if="!item.item" class="body-items__name">{{ item.name }}</span>

        <ui-item-card
          v-else
          :item="item.item"
        />
      </div>
    </div>
    <div class="pack-items">
      <div
        class="pack-items__back" 
        v-for="item in packBack"
        :key="item.name"
        :id="item.name.toString()"
        @drop="event => drop(event, 'packBack')"
        @dragover="allowDrop"
        @dragleave="leaveDrag"
      >
        
        <span v-if="!item.item" class="pack-items__name">{{ item.name }}</span>

        <ui-condition-card
          v-else-if="isCondition(item.item)"
          :condition="item.item"
        />

        <ui-item-card
          v-else
          :item="item.item"
        />
          
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '../../store/character'
import conditions from '../../data/conditionsList.json'
import UiItemCard from '../ui/UiItemCard.vue'
import UiConditionCard from '../ui/uiConditionCard.vue'

const store = useStore()

const isCondition = (title: string): Boolean =>
  conditions.list.filter(item => item.title === title).length ? true : false

const bodyBack = computed(() => store.bodyBack)
const packBack = computed(() => store.packBack)

const allowDrop = (event: DragEvent) => {
  event.preventDefault();
  (event.target as HTMLElement).classList.add('droppable')
}

const leaveDrag = (event: DragEvent) => {
  event.preventDefault();
  (event.target as HTMLElement).classList.remove('droppable')
}

const drop = (event: DragEvent, type: string) => {
  event.preventDefault()
  
  if (event.target.childNodes[0].classList.contains('body-items__name')
      || event.target.childNodes[0].classList.contains('pack-items__name')) {
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

    let data = event.dataTransfer
      ? event.dataTransfer.getData('text')
      : null

    if (data && event.target?.id) {
      if (type === 'bodyBack') {
        store.updateItems('bodyBack', {
          ...bodyBack.value,
          [event.target.id]: {
            name: event.target.id,
            item: data
          }
        })
      }

      if (type === 'packBack') {
        store.updateItems('packBack', {
          ...packBack.value,
          [event.target.id]: {
            name: event.target.id,
            item: data
          }
        })
      }
    }
  }

  event.target.classList.remove('droppable')
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
  border: 2px solid var(--main);
  overflow: hidden;

  &__item {
    border: 1px dashed var(--second);

    &:nth-child(1) {
      border-left: none;
      border-top: none;
    }
    
    &:nth-child(2) {
      border-right: none;
      border-top: none;
    }

    &:nth-child(3) {
      border-left: none;
      border-bottom: none;
    }

    &:nth-child(4) {
      border-right: none;
      border-bottom: none;
    }
  }

  &__name {
    display: inline-block;
    text-align: center;
    font-family: 'Pirata One', sans-serif;
    font-size: 2em;
    line-height: 1;
    color: var(--second);
    margin-top: 10px;
    pointer-events: none;
    background: top;
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
    border: 1px dashed var(--second);

    &:nth-child(1) {
      border-left: none;
      border-top: none;
    }
    
    &:nth-child(2) {
      border-top: none;
    }

    &:nth-child(3) {
      border-top: none;
      border-right: none;
    }

    &:nth-child(4) {
      border-left: none;
      border-bottom: none;
    }

    &:nth-child(5) {
      border-bottom: none;
    }

    &:nth-child(6) {
      border-right: none;
      border-bottom: none;
    }
  }

  &__name {
    display: inline-block;
    text-align: center;
    font-family: 'Pirata One', sans-serif;
    font-size: 4em;
    line-height: 1;
    color: var(--second);
    margin-top: 40px;
    pointer-events: none;
    background: top;
  }
}
</style>
