<template>
  <div
    class="inventory"
    :class="Object.keys(bodyBack).length === 2 && `inventory--hireling`"
  >
    <div
      class="body-items"
      :class="Object.keys(bodyBack).length === 2 && `body-items--hireling`"
    >
      <div 
        v-for="item, index in bodyBack"
        :id="item.name.toString()"
        :key="`it__${index}`"
        class="body-items__back"
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
          :used="item.used"
          @point-click="setBodyItemStats($event, index)"
        />
      </div>
    </div>
    <div
      class="pack-items"
      :class="Object.keys(packBack).length === 4 && `pack-items--hireling`"
    >
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
          :used="item.used"
          @point-click="setPackItemStats($event, index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '../../store/character'
import conditions from '../../data/conditionList.json'
import UiItemCard from '../ui/UiItemCard.vue'
import UiConditionCard from '../ui/uiConditionCard.vue'
import { BodyBack, BodyIndexes, PackBack, PackIndexes } from '../../types'

const props = defineProps({
  bodyBack: {
    type: Object,
    required: true
  },
  packBack: {
    type: Object,
    required: true
  }
})

const store = useStore()

const isCondition = (title: string): Boolean =>
  conditions.list.filter(item => item.title === title).length ? true : false

const allowDrop = (event: DragEvent) => {
  event.preventDefault();
  (event.target as HTMLElement).classList.add('droppable')
}

const leaveDrag = (event: DragEvent) => {
  event.preventDefault();
  (event.target as HTMLElement).classList.remove('droppable')
}

const drop = async (event: DragEvent, type: string) => {
  event.preventDefault()  
  
  // eslint-disable-next-line no-undef
  const firstChild: ChildNode = (event.target as Node).childNodes[0]

  if (!firstChild) {
    (event.target as HTMLElement).classList.remove('droppable')
    return null
  }

  if ((firstChild as HTMLElement).classList.contains('body-items__name') ||
      (firstChild as HTMLElement).classList.contains('pack-items__name')) {

    const moveFrom = async () => {
      const slotId = event.dataTransfer
        ? event.dataTransfer.getData('id')
        : null

      if (slotId) {
        if (Object.keys(props.bodyBack).includes(slotId)) {
          store.updateItems('bodyBack', {
            ...props.bodyBack as BodyBack,
            [slotId]: {
              name: slotId,
              item: null,
              used: 0
            }
          })
        }

        if (Object.keys(props.packBack).includes(slotId)) {
          store.updateItems('packBack', {
            ...props.packBack as PackBack,
            [slotId]: {
              name: slotId,
              item: null,
              used: 0
            }
          })
        }
      }
    }

    const moveTo = () => {
      const data = event.dataTransfer
        ? event.dataTransfer.getData('text')
        : null

      const id = (event.target as HTMLElement).id
        ? (event.target as HTMLElement).id
        : null

      const used = event.dataTransfer
        ? +event.dataTransfer.getData('used')
        : 0

      if (data && id) {
        if (type === 'bodyBack') {
          store.updateItems('bodyBack', {
            ...props.bodyBack as BodyBack,
            [id]: {
              name: id,
              item: data,
              used: used
            }
          })
        }

        if (type === 'packBack') {
          store.updateItems('packBack', {
            ...props.packBack as PackBack,
            [id]: {
              name: id,
              item: data,
              used: used
            }
          })
        }
      }
    }

    await moveFrom()
    moveTo()
  }

  (event.target as HTMLElement).classList.remove('droppable')
}

const setBodyItemStats = (event: number, index: string) => {  
  if (event > +props.bodyBack[index as BodyIndexes].used) {
    store.updateItems('bodyBack', {
      ...props.bodyBack as BodyBack,
      [index]: {
        name: props.bodyBack[index as BodyIndexes].name,
        item: props.bodyBack[index as BodyIndexes].item,
        used: event
      }
    })
  } else {
    store.updateItems('bodyBack', {
      ...props.bodyBack as BodyBack,
      [index]: {
        name: props.bodyBack[index as BodyIndexes].name,
        item: props.bodyBack[index as BodyIndexes].item,
        used: +props.bodyBack[index as BodyIndexes].used - 1
      }
    })
  }
}

const setPackItemStats = (event: number, index: string | number) => {
  if (event > +props.packBack[index as PackIndexes].used) {
    store.updateItems('packBack', {
      ...props.packBack as PackBack,
      [index]: {
        name: props.packBack[index as PackIndexes].name,
        item: props.packBack[index as PackIndexes].item,
        used: event
      }
    })
  } else {
    store.updateItems('packBack', {
      ...props.packBack as PackBack,
      [index]: {
        name: props.packBack[index as PackIndexes].name,
        item: props.packBack[index as PackIndexes].item,
        used: +props.packBack[index as PackIndexes].used - 1
      }
    })
  }
}
</script>

<style lang="scss">
.inventory {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  text-align: center;

  &--hireling {
    padding-top: 20px;
  }
}

.body-items {
  display: grid;
  position: relative;
  grid-template-columns: 120px 120px;
  grid-template-rows: 120px 120px;
  border: 2px solid var(--main);
  overflow: hidden;

  &__back {
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

  &--hireling {
    grid-template-columns: 120px;
    grid-template-rows: 120px 120px;

    .body-items__back {
      border: 1px dashed var(--second);

      &:nth-child(1) {
        border-left: none;
        border-top: none;
        border-right: none;
      }
      
      &:nth-child(2) {
        border-right: none;
        border-bottom: none;
        border-left: none;
      }
    }
  }

  &__item {
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    min-width: 121px;
    min-height: 121px;
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
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    min-width: 121px;
    min-height: 121px;

    &--heavy {
      height: 244px;
    }

    &--light-armor {
      width: 244px;
    }
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

  &--hireling {
    grid-template-columns: 120px 120px;
    grid-template-rows: 120px 120px;

    .pack-items__back {
      border: 1px dashed var(--second);

      &:nth-child(1) {
        border-left: none;
        border-top: none;
      }

      &:nth-child(2) {
        border-top: none;
        border-right: none;
      }

      &:nth-child(3) {
        border-left: none;
        border-bottom: none;
      }

      &:nth-child(4) {
        border-bottom: none;
        border-right: none;
      }
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
