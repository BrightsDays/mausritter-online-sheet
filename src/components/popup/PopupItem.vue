<template>
  <PopupLayout
    v-if="emptySlot"
    :ok-button-disabled="item.title.length < 3"
    title="Add custom item"
    @ok="addItem()"
  >
    <template #body>
      <UiInput
        v-model="item.title"
        label="Title"
        type="text"
      />
      <UiSelect
        v-model="item.type"
        label="Item type"
        :options="typeList"
      />
      <UiSelect
        v-if="item.type === 'Utility'"
        v-model="item.size"
        label="Item size"
        :options="sizeList"
      />
    </template>
  </PopupLayout>

  <PopupLayout v-else>
    <template #body>
      <span class="content">
        Sorry, you have not space in your backpack!<br>
        Empty the space to add custom items.
      </span>
    </template>
  </PopupLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usePopupStore } from '../../store/popup'
import { useCharacterStore } from '../../store/character'
import PopupLayout from './PopupLayout.vue'
import { PackBack, PackIndexes } from '../../types/inventory'
import UiSelect from '../ui/UiSelect.vue'
import UiInput from '../ui/UiInput.vue'

const characterStore = useCharacterStore()
const popupStore = usePopupStore()

const typeList = [
  'Utility', 'Light weapon', 'Medium weapon', 'Heavy weapon', 'Light ranged',
  'Heavy ranged', 'Light armor', 'Heavy armor', 'Spell'
]
const sizeList = ['Small', 'Tall', 'Wide', 'Big']
const item = ref({
  title: '',
  type: 'Utility',
  size: sizeList[0]
})

const emptySlot = ref('')

const close = () => popupStore.setPopup(null)

const addItem = () => {
  if (item.value.title.length >= 3) {
    const newItem = {
      title: item.value.title,
      stat: '',
      image: item.value.type === 'Spell' ? 'Spell' : '',
      type: item.value.type,
      group: 'items',
      used: 0
    }

    if (item.value.type === 'Utility') {
      switch (item.value.size) {
        case 'Small':
          newItem.image = 'Smallpack'
          break
        case 'Tall':
          newItem.type = 'Height utility'
          newItem.image = 'Heightpack'
          break
        case 'Wide':
          newItem.type = 'Wide utility'
          newItem.image = 'Widthpack'
          break
        case 'Big':
          newItem.type = 'Big utility'
          newItem.image = 'Bigpack'
          break
        default:
          break
      }
    }

    switch (item.value.type) {
      case 'Light weapon':
        newItem.type = 'Light'
        break
      case 'Medium weapon':
        newItem.type = 'Medium'
        break
      case 'Heavy weapon':
        newItem.type = 'Heavy'
        break
      default:
        break
    }

    switch (item.value.type) {
      case 'Light weapon' || 'Light ranged':
        newItem.stat = 'd6'
        break
      case 'Medium weapon':
        newItem.stat = 'd6/d8'
        break
      case 'Heavy weapon':
        newItem.stat = 'd10'
        break
      case 'Heavy ranged':
        newItem.stat = 'd8'
        break
      case 'Light armor' || 'Heavy armor':
        newItem.stat = '1 def'
        break
    }

    characterStore.updateItems('packBack', {
      ...characterStore.packBack as PackBack,
      [emptySlot.value]: {
        name: emptySlot.value,
        item: newItem
      }
    })

    item.value.title = ''

    close()
  }
}

onMounted(() => {
  Object.keys(characterStore.packBack).every(item => {
    if (!characterStore.packBack[item as PackIndexes].item) {
      emptySlot.value = characterStore.packBack[item as PackIndexes].name
      return false
    } else {
      return true
    }
  })
})
</script>

<style lang="scss" scoped>
.content {
  font-family: "Pirata One", sans-serif;
  font-size: 3.2em;
  color: var(--second);
}
</style>