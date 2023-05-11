<template>
  <PopupLayout
    title="Add hireling"
    ok-button-text="Create"
    :ok-button-disabled="!hireling"
    @ok="saveHireling(hireling)"
  >
    <template #body>
      <UiSelect
        v-model="hireling"
        label="Select hireling"
        :options="hirelingList"
      />
    </template>
  </PopupLayout>
</template>

<script setup lang="ts">
import createHireling from '../../composables/createSimpleCard'
import { useCharacterStore } from '../../store/character'
import PopupLayout from './PopupLayout.vue'
import { useNotificationsStore } from '../../store/notifications'
import UiSelect from '../ui/UiSelect.vue'

const characterStore = useCharacterStore()
const notificationStore = useNotificationsStore()

const hirelingList = [
  'Torchbearer', 'Labourer', 'Tunnel digger', 'Blacksmith', 'Local guide',
  'Mouse-at-arms', 'Scholar', 'Knight', 'Interpreter'
]
const hireling = $ref(hirelingList[0])

const saveHireling = (hirelingName: string) => {
  characterStore.addHireling(createHireling(`Hireling: ${hirelingName}`))

  notificationStore.setNotification({
    type: 'info',
    message: `Hireling: ${hirelingName} was added`
  })
}
</script>