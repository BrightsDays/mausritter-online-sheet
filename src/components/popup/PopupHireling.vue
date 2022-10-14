<template>
  <popup-layout>
    <h3 class="popup__header">
      Add hireling
    </h3>
    <form class="popup__form">
      <div class="popup__section">
        <label class="popup__label">Select hireling</label>
        <select
          v-model="hireling"
          class="popup__select"
          def
        >
          <option>
            Torchbearer
          </option>
          <option>
            Labourer
          </option>
          <option>
            Tunnel digger
          </option>
          <option>
            Blacksmith
          </option>
          <option>
            Local guide
          </option>
          <option>
            Mouse-at-arms
          </option>
          <option>
            Scholar
          </option>
          <option>
            Knight
          </option>
          <option>
            Interpreter
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
          :disabled="!hireling"
          class="popup__button"
          @click.prevent="saveHireling(hireling)"
        >
          Create
        </button>
      </div>
    </form>
  </popup-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import createHireling from '../../helpers/createHireling'
import { usePopupStore } from '../../store/popup'
import { useCharacterStore } from '../../store/character'
import PopupLayout from './PopupLayout.vue'

const characterStore = useCharacterStore()
const popupStore = usePopupStore()

const hireling = ref('')

const close = () => popupStore.setPopup(null)

const saveHireling = (hireling: string) => {
  characterStore.addHireling(createHireling(`Hireling: ${hireling}`))
  close()
}
</script>