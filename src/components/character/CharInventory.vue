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
        :key="`it__${item}`"
        :data-index="hirelingIndex"
        :data-warband="isWarband"
        class="body-items__back"
        @drop="event => drop(event, 'bodyBack', store)"
        @dragover="allowDrop"
        @dragleave="leaveDrag"
      >
        <span
          v-if="!item.item"
          class="body-items__name"
        >
          {{ item.name }}
        </span>

        <UiItemCard
          v-else
          :item="item.item"
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
        :key="`pb__${item}`"
        :data-index="hirelingIndex"
        :data-warband="isWarband"
        class="pack-items__back"
        @drop="event => drop(event, 'packBack', store)"
        @dragover="allowDrop"
        @dragleave="leaveDrag"
      >
        <span
          v-if="!item.item"
          class="pack-items__name"
        >
          {{ item.name }}
        </span>

        <UiConditionCard
          v-else-if="item.item?.group === 'conditions'"
          :condition="item.item"
        />

        <UiItemCard
          v-else
          :item="item.item"
          @point-click="setPackItemStats($event, index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '../../store/character'
import UiConditionCard from '../ui/UiConditionCard.vue'
import { BodyBack, BodyIndexes, PackBack, PackIndexes } from '../../types'
import { allowDrop, leaveDrag, drop } from '../../helpers/dragNDrop'
import UiItemCard from '../ui/UiItemCard.vue'

const props = defineProps({
  bodyBack: {
    type: Object,
    required: true
  },
  packBack: {
    type: Object,
    required: true
  },
  hirelingIndex: {
    type: Number,
    required: false,
    default: null
  },
  isWarband: {
    type: String || null,
    required: false,
    default: null
  }
})

const store = useCharacterStore()
//TODO combine set items in one function
const setBodyItemStats = (event: number, index: string) => {
  if (typeof props.hirelingIndex !== 'number') {
    if (event > +props.bodyBack[index as BodyIndexes].item.used) {
      store.updateItems('bodyBack', {
        ...props.bodyBack as BodyBack,
        [index]: {
          name: props.bodyBack[index as BodyIndexes].name,
          item: {
            ...props.bodyBack[index as BodyIndexes].item,
            used: event  
          }
        }
      })
    } else {
      store.updateItems('bodyBack', {
        ...props.bodyBack as BodyBack,
        [index]: {
          name: props.bodyBack[index as BodyIndexes].name,
          item: {
            ...props.bodyBack[index as BodyIndexes].item,
            used: +props.bodyBack[index as BodyIndexes].item.used - 1  
          }
        }
      })
    }
  } else {
    if (event > +props.bodyBack[index as BodyIndexes].item.used) {
      store.updateHirelingItems('bodyBack', {
        ...props.bodyBack as BodyBack,
        [index]: {
          name: props.bodyBack[index as BodyIndexes].name,
          item: {
            ...props.bodyBack[index as BodyIndexes].item,
            used: event
          }
        }
      }, props.hirelingIndex)
    } else {
      store.updateHirelingItems('bodyBack', {
        ...props.bodyBack as BodyBack,
        [index]: {
          name: props.bodyBack[index as BodyIndexes].name,
          item: {
            ...props.bodyBack[index as BodyIndexes].item,
            used: +props.bodyBack[index as BodyIndexes].item.used - 1
          }
        }
      }, props.hirelingIndex)
    }
  }
}

const setPackItemStats = (event: number, index: string | number) => {
  if (typeof props.hirelingIndex !== 'number') {
    if (event > +props.packBack[index as PackIndexes].item.used) {
      store.updateItems('packBack', {
        ...props.packBack as PackBack,
        [index]: {
          name: props.packBack[index as PackIndexes].name,
          item: {
            ...props.packBack[index as PackIndexes].item,
            used: event
          }
        }
      })
    } else {
      store.updateItems('packBack', {
        ...props.packBack as PackBack,
        [index]: {
          name: props.packBack[index as PackIndexes].name,
          item: {
            ...props.packBack[index as PackIndexes].item,
            used: +props.packBack[index as PackIndexes].item.used - 1
          }
        }
      })
    }
  } else {
    if (event > +props.packBack[index as PackIndexes].item.used) {
      store.updateHirelingItems('packBack', {
        ...props.packBack as PackBack,
        [index]: {
          name: props.packBack[index as PackIndexes].name,
          item: {
            ...props.packBack[index as PackIndexes].item,
            used: event
          }
        }
      }, props.hirelingIndex)
    } else {
      store.updateHirelingItems('packBack', {
        ...props.packBack as PackBack,
        [index]: {
          name: props.packBack[index as PackIndexes].name,
          item: {
            ...props.packBack[index as PackIndexes].item,
            used: +props.packBack[index as PackIndexes].item.used - 1
          }
        }
      }, props.hirelingIndex)
    }
  }
}
</script>

<style lang="scss">
.inventory {
  display: flex;
  justify-content: space-between;
  text-align: center;
  gap: 10px;

  &--hireling {
    padding-top: 20px;
  }
}

.body-items {
  display: grid;
  position: relative;
  width: 242px;
  height: 242px;
  grid-template-columns: 120px 120px;
  grid-template-rows: 120px 120px;
  border: 1px solid var(--main);
  overflow: hidden;

  &__back {
    position: relative;

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: -1px;
      left: -1px;
      width: 100%;
      height: 100%;
      border: 1px dashed var(--second);
    }
  }

  &--hireling {
    width: 122px;
    grid-template-columns: 120px;
    grid-template-rows: 120px 120px;
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
  width: 362px;
  height: 242px;
  grid-template-columns: 120px 120px 120px;
  grid-template-rows: 120px 120px;
  border: 1px solid var(--main);
  overflow: hidden;

  &__list {
    position: absolute;
    display: grid;
    height: 240px;
    grid-template-columns: 120px 120px 120px;
    grid-template-rows: 120px 120px;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: none;
  }

  &__back {
    position: relative;

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: -1px;
      left: -1px;
      width: 100%;
      height: 100%;
      border: 1px dashed var(--second);
    }
  }

  &--hireling {
    width: 242px;
    grid-template-columns: 120px 120px;
    grid-template-rows: 120px 120px;
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
