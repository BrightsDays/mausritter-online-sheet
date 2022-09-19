<template>
  <div class="inventory">
    <div class="body-items">
      <div 
        v-for="item in bodyBack" 
        :id="item.name.toString()"
        :key="item.name"
        class="body-items__item"
        @drop="event => drop(event, 'bodyBack')"
        @dragover="allowDrop"
        @dragleave="leaveDrag"
      >
        <span
          v-if="!item.item || isCondition(item.item)"
          class="body-items__name"
        >{{ item.name }}</span>

        <ui-item-card
          v-else
          :item="item.item"
        />
      </div>
    </div>
    <div class="pack-items">
      <div
        v-for="item, index in packBack"
        :id="item.name.toString()"
        :key="`pb_${index}_${item.item}`"
        class="pack-items__back"
        @drop="event => drop(event, 'packBack')"
        @dragover="allowDrop"
        @dragleave="leaveDrag"
      >
        <span
          v-if="!item.item"
          class="pack-items__name"
        >{{ item.name }}</span>

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
import { computed, ComputedRef } from 'vue'
import { useStore } from '../../store/character'
import conditions from '../../data/conditionList.json'
import UiItemCard from '../ui/UiItemCard.vue'
import UiConditionCard from '../ui/uiConditionCard.vue'
import { BodyBack, PackBack } from '../../types'

const store = useStore()

const isCondition = (title: string): Boolean =>
  conditions.list.filter(item => item.title === title).length ? true : false

const bodyBack: ComputedRef<BodyBack> = computed(() => store.bodyBack)
const packBack: ComputedRef<PackBack> = computed(() => store.packBack)

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
  
  // eslint-disable-next-line no-undef
  const firstChild: ChildNode = (event.target as Node).childNodes[0]

  if ((firstChild as HTMLElement).classList.contains('body-items__name')
      || (firstChild as HTMLElement).classList.contains('pack-items__name')) {
    const slotId = event.dataTransfer
      ? event.dataTransfer.getData('id')
      : null
  
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

    const data = event.dataTransfer
      ? event.dataTransfer.getData('text')
      : null

    const id = (event.target as HTMLElement).id
      ? (event.target as HTMLElement).id
      : null

    if (data && id) {
      if (type === 'bodyBack') {
        store.updateItems('bodyBack', {
          ...bodyBack.value,
          [id]: {
            name: id,
            item: data
          }
        })
      }

      if (type === 'packBack') {
        store.updateItems('packBack', {
          ...packBack.value,
          [id]: {
            name: id,
            item: data
          }
        })
      }
    }
  }

  (event.target as HTMLElement).classList.remove('droppable')
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
