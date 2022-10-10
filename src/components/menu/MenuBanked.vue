<template>
  <div class="banked">
    <div class="banked-items">
      <div
        v-for="item, index in bank"
        :id="`${item.name}`"
        :key="`pb_${index}_${item}`"
        class="banked-items__item"
        @drop="event => drop(event)"
        @dragover="allowDrop"
        @dragleave="leaveDrag"
      >
        <div v-if="!item.item" />

        <ui-item-card
          v-else
          :item="item.item"
          :used="item.used"
          class="banked-items__card"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiItemCard from '../ui/UiItemCard.vue'
import { computed, ComputedRef, ref } from 'vue'
import { useStore } from '../../store/character'
import { BodyBack, PackBack } from '../../types'

const characterStore = useStore()

const bodyBack: ComputedRef<BodyBack> = computed(() => characterStore.bodyBack)
const packBack: ComputedRef<PackBack> = computed(() => characterStore.packBack)

const bank = ref({
  bnk__1: {
    name: 'bnk__1',
    item: null,
    used: 0
  }
})

const allowDrop = (event: DragEvent) => {
  event.preventDefault();
  (event.target as HTMLElement).classList.add('droppable')
}

const leaveDrag = (event: DragEvent) => {
  event.preventDefault();
  (event.target as HTMLElement).classList.remove('droppable')
}

const drop = (event: DragEvent) => {
  event.preventDefault()
  
  // eslint-disable-next-line no-undef
  const firstChild: ChildNode = (event.target as Node).childNodes[0]
  
  if (!firstChild) {
    (event.target as HTMLElement).classList.remove('droppable')
    return null
  }

  if (firstChild) {
    const slotId = event.dataTransfer
      ? event.dataTransfer.getData('id')
      : null

    if (slotId) {
      if (Object.keys(bodyBack.value).includes(slotId)) {     
        characterStore.updateItems('bodyBack', {
          ...bodyBack.value,
          [slotId]: {
            name: slotId,
            item: null,
            used: 0
          }
        })
      }

      if (Object.keys(packBack.value).includes(slotId)) {
        characterStore.updateItems('packBack', {
          ...packBack.value,
          [slotId]: {
            name: slotId,
            item: null,
            used: 0
          }
        })
      }

      if (Object.keys(bank.value).includes(slotId)) {
        (event.target as HTMLElement).classList.remove('droppable')
        return null
      }
    }

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
      const nextId = `bnk__${+id.substring(5) + 1}`
      
      bank.value = {
        ...bank.value,
        [id]: {
          name: id,
          item: data,
          used: used
        },
        [nextId]: {
          name: nextId,
          item: null,
          used: 0
        }
      }
    }
  }

  (event.target as HTMLElement).classList.remove('droppable')
}
</script>

<style lang="scss">
.banked-items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-left: -14px;

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 121px;
    height: 121px;
    padding: 5px;
    border: 1px solid var(--main);
    color: var(--main);
    cursor: move;
    position: relative;
    left: 0.5px;
    border: 1px dashed var(--second);
  }

  .banked-items__card {
    margin: -6px;
    border: 1px solid var(--main);

    .points {
      opacity: 1;
    }
  }
}
</style>