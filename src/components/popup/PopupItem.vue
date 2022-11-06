<template>
  <popup-layout>
    <h3 class="popup__header">
      Add custom item
    </h3>
    <div
      v-if="emptySlot"
      class="popup__form"
    >
      <div class="popup__section">
        <label class="popup__label">Title</label>
        <input
          v-model="item.title"
          class="popup__input"
        >
      </div>
      <div class="popup__section">
        <label class="popup__label">Item type</label>
        <select
          v-model="item.type"
          class="popup__select"
        >
          <option>
            Utility
          </option>
          <option>
            Light weapon
          </option>
          <option>
            Medium weapon
          </option>
          <option>
            Heavy weapon
          </option>
          <option>
            Light ranged
          </option>
          <option>
            Heavy ranged
          </option>
          <option>
            Light armor
          </option>
          <option>
            Heavy armor
          </option>
          <option>
            Spell
          </option>
        </select>
      </div>
      <div
        v-if="item.type === 'Utility'"
        class="popup__section"
      >
        <label class="popup__label">Item size</label>
        <select
          v-model="item.size"
          class="popup__select"
        >
          <option>
            1 x 1
          </option>
          <option>
            1 x 2
          </option>
          <option>
            2 x 1
          </option>
          <option>
            2 x 2
          </option>
        </select>
      </div>
      <div class="popup__section popup__section--buttons">
        <button
          class="popup__button"
          @click.prevent="close()"
        >
          Cancel
        </button>
        <button
          :disabled="item.title.length < 3"
          class="popup__button"
          @click.prevent="addItem()"
        >
          Create
        </button>
      </div>
    </div>
    <div
      v-else
      class="popup__form"
    >
      <div class="popup__section">
        <span class="popup__label">
          Sorry, you have not space in your backpack!<br>
          Empty the space to add custom items.
        </span>
      </div>
    </div>
  </popup-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usePopupStore } from '../../store/popup'
import { useCharacterStore } from '../../store/character'
import PopupLayout from './PopupLayout.vue'
import { PackBack, PackIndexes } from '../../types';

const characterStore = useCharacterStore()
const popupStore = usePopupStore()

const item = ref({
  title: '',
  type: 'Utility',
  size: '1 x 1'
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
        case '1 x 1':
          newItem.image = 'Smallpack'
          break
        case '1 x 2':
          newItem.type = 'Height utility'
          newItem.image = 'Heightpack'
          break
        case '2 x 1':
          newItem.type = 'Wide utility'
          newItem.image = 'Widthpack'
          break
        case '2 x 2':
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
        newItem.stat = 'd8/d10'
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

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') addItem()
  })
})
</script>