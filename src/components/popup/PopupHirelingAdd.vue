<template>
  <PopupLayout title="Add hireling">
    <template #body>
      <UiSelect
        v-model="hireling"
        label="Select hireling"
        :options="hirelingList"
      />
    </template>
    <template #footer>
      <UiButton
        text="Cancel"
        type="big"
        @click.prevent="close()"
      />
      <UiButton
        :disabled="!hireling"
        text="Create"
        type="big"
        @click.prevent="saveHireling(hireling)"
      />
    </template>
  </PopupLayout>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import createHireling from '../../helpers/createSimpleCard'
import { usePopupStore } from '../../store/popup'
import { useCharacterStore } from '../../store/character'
import PopupLayout from './PopupLayout.vue'
import { useNotificationsStore } from '../../store/notifications'
import UiSelect from '../ui/UiSelect.vue'
import UiButton from '../ui/UiButton.vue'

const characterStore = useCharacterStore()
const popupStore = usePopupStore()
const notificationStore = useNotificationsStore()

const hirelingList = [
  'Torchbearer', 'Labourer', 'Tunnel digger', 'Blacksmith', 'Local guide',
  'Mouse-at-arms', 'Scholar', 'Knight', 'Interpreter'
]
const hireling = ref(hirelingList[0])

const close = () => popupStore.setPopup(null)

const saveHireling = (hirelingName: string) => {
  characterStore.addHireling(createHireling(`Hireling: ${hirelingName}`))

  notificationStore.setNotification({
    type: 'info',
    message: `Hireling: ${hirelingName} was added`
  })
    
  close()
}

const addByClick = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
  event.preventDefault()
  saveHireling(hireling.value)
}
}
onMounted(() => window.addEventListener('keydown', addByClick))
onUnmounted(() => window.removeEventListener('keydown', addByClick))
</script>