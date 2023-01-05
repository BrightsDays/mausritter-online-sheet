<template>
  <new-popup-layout title="Add hireling">
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
  </new-popup-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import createHireling from '../../helpers/createHireling'
import { usePopupStore } from '../../store/popup'
import { useCharacterStore } from '../../store/character'
import NewPopupLayout from '../new-popup/NewPopupLayout.vue'
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
  if (hireling.value) {
    characterStore.addHireling(createHireling(`Hireling: ${hirelingName}`))

    notificationStore.setNotification({
      type: 'info',
      message: `Hireling: ${hirelingName} was added`
    })

    hireling.value = ''
    close()
  }
}

onMounted(() => {
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') saveHireling(hireling.value)
  })
})
</script>