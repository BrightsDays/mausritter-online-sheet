<template>
  <transition name="fade">
    <div class="popup">
      <div 
        class="popup__shadow"
        @click.native="close()"
      />
      <div class="popup__box">
        <button
          class="popup__close"
          @click.prevent="close()"
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
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { usePopupStore } from '../../store/popup'

const popupStore = usePopupStore()

const close = () => popupStore.setPopup(null)
</script>

<styles lang="scss">
.popup {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  background: none;
  z-index: 1;

  &__shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255);
    opacity: 0.2;
  }

  &__box {
    position: relative;
    width: fit-content;
    padding: 20px;
    background: var(--background);
    border: 2px var(--main) solid;
    border-radius: 15px;
    z-index: 1;
  }

  &__close {
    position: absolute;
    top: 15px;
    right: 15px;
    border: none;
    cursor: pointer;

    svg path {
      stroke: var(--main);
    }
  }
}
</styles>