<template>
  <div class="popup">
    <div 
      class="shadow"
      @click="cancelHandler()"
    />
    <div class="box">
      <div class="header">
        <button
          class="close"
          @click.prevent="cancelHandler()"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L8 8M15 15L8 8M8 8L15 1L1 15"
              stroke="#272727"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <h2 class="title">
          {{ title }}
        </h2>
      </div>
      <div class="body">
        <slot name="body" />
      </div>
      <div
        v-if="buttons !== '0'"
        class="footer"
      >
        <UiButton
          :text="cancelButtonText"
          type="big"
          @click.prevent="cancelHandler()"
        />
        <UiButton
          :disabled="okButtonDisabled"
          :text="okButtonText"
          type="big"
          @click.prevent="okHandler()"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { usePopupStore } from '../../store/popup'
import UiButton from '../ui/UiButton.vue'

const {
  title,
  buttons = '2',
  okButtonDisabled = false,
  okClosePrevent = false,
  cancelButtonText = 'Cancel',
  okButtonText = 'OK'
} = defineProps<{
  title?: string
  buttons?: '0' | '1' | '2'
  okButtonDisabled?: boolean
  okClosePrevent?: boolean
  cancelButtonText?: string
  okButtonText?: string
}>()

const emit = defineEmits(['ok', 'cancel'])

const popupStore = usePopupStore()

const cancelHandler = () => {
  popupStore.setPopup(null)
  emit('cancel')
}

const okHandler = () => {
  if (!okClosePrevent) popupStore.setPopup(null)
  emit('ok')
}

const closeByClick = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault()
    cancelHandler()
  }   
}

// const okByClick = (event: KeyboardEvent) => {
//   if (event.key === 'Enter') {
//     event.preventDefault()
//     okHandler()
//   }
// }

onMounted(async () => {
  window.addEventListener('keydown', closeByClick)
  // window.addEventListener('keydown', okByClick)
})

onUnmounted(async () => {
  window.removeEventListener('keydown', closeByClick)
  // window.addEventListener('keydown', okByClick)
})
</script>

<styles lang="scss" scoped>
.popup {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100svh;
  align-items: center;
  justify-content: space-around;
  background: none;
  z-index: 2;

  .shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255);
    opacity: 0.2;
  }

  .box {
    display: flex;
    position: relative;
    width: fit-content;
    max-height: 90svh;
    padding: 40px 30px 30px;
    flex-direction: column;
    gap: 20px;
    background: var(--background);
    border: 2px var(--main) solid;
    border-radius: 15px;
    z-index: 2;

    .header {
      .close {
        position: absolute;
        top: 15px;
        right: 15px;
        border: none;
        cursor: pointer;

        svg path {
          stroke: var(--main);
        }
      }

      .title {
        text-align: center;
        font-family: "Pirata One", sans-serif;
        font-size: 4.2em;
        font-weight: normal;
        line-height: 1;
        color: var(--main);
      }
    }

    .body {
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      gap: 10px;
    }

    .footer {
      display: flex;
      justify-content: space-between;
    }
  }
}
</styles>