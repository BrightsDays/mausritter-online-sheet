<template>
  <NewPopupLayout
    title="Upload character"
    buttons="0"
  >
    <template #body>
      <div class="upload">
        <input
          id="upload"
          ref="upload"
          type="file"
          accept=".json"
          class="input"
          @change="uploadCharacter($event)"
        >
        <label
          for="upload"
          class="label"
        >
          Upload character
        </label>
      </div>
    </template>
  </NewPopupLayout>
</template>

<script setup lang="ts">
import { usePopupStore } from '../../store/popup'
import { useCharacterStore } from '../../store/character'
import { useNotificationsStore } from '../../store/notifications'
import NewPopupLayout from './PopupLayout.vue'

const characterStore = useCharacterStore()
const popupStore = usePopupStore()
const notificationStore = useNotificationsStore()

const close = () => popupStore.setPopup(null)

const uploadCharacter = (event: Event) => {
  if (event.target) {
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.result) {
        const testCharacter = { ...characterStore }

        Object.keys(testCharacter).forEach(key => {
          if (key.includes('_') || key.includes('$')) {
            delete testCharacter[key as keyof typeof testCharacter]
          }
        })

        const character = JSON.parse(reader.result as string)
        let isValid = true
        
        Object.keys(character).forEach((key: string) => {
          if (!Object.keys(testCharacter).includes(key)) {
            isValid = false
          }
        })

        if (isValid) characterStore.fillCharacter(character)
      }
    }
    
    const result = (event.target as HTMLInputElement).files
    if (result) reader.readAsText(result[0])
  }

  notificationStore.setNotification({
    type: 'info',
    message: 'Character uploaded'
  })

  close()
}
</script>

<style lang="scss" scoped>
.content {
  font-family: "Pirata One", sans-serif;
  font-size: 3.2em;
  color: var(--second);
}

.upload {
  position: relative;
  width: 280px;
  height: 140px;

  .input {
    position: relative;
    width: 100%;
    text-align: right;
    font-family: "Cookie", sans-serif;
    font-size: 3em;
    color: var(--main);
    border: none;
    border-bottom: 1px solid var(--main);
    outline: none;
    appearance: none;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .label {
    position: absolute;
    top: 0;
    left: 0;
    font-family: "Pirata One", sans-serif;
    font-size: 3.2em;
    font-weight: normal;
    line-height: 1;
    color: var(--second);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border: dashed 2px var(--second);
    border-radius: 15px;
    pointer-events: none;
  }
}
</style>