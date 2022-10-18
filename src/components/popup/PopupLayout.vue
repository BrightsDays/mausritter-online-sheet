<template>
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
  z-index: 2;

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
    padding: 40px 30px 30px;
    background: var(--background);
    border: 2px var(--main) solid;
    border-radius: 15px;
    z-index: 2;
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

  &__header {
    font-family: "Pirata One", sans-serif;
    font-size: 4.2em;
    font-weight: normal;
    line-height: 1;
    color: var(--main);
  }

  &__form {
    display: flex;
    margin: 20px auto 0;
    flex-direction: column;
    gap: 10px;
  }

  &__section {
    display: flex;
    justify-items: center;
    justify-content: space-between;

    &--buttons {
      margin-top: 20px;
    }

    &--info {
      justify-content: space-around;
    }

    &--upload {
      position: relative;
      width: 280px;
      height: 140px;
    }
  }

  &__label {
    font-family: "Pirata One", sans-serif;
    font-size: 3.2em;
    font-weight: normal;
    line-height: 1;
    color: var(--second);

    &--upload {
      display: flex;
      position: absolute;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border: dashed 2px var(--second);
      border-radius: 15px;
      pointer-events: none;
    }
  }

  &__stats {
    font-family: "Pirata One", sans-serif;
    font-size: 3.2em;
    font-weight: normal;
    line-height: 1;
    color: var(--main);
  }

  &__input {
    margin-left: 10px;
    width: 100%;
    text-align: right;
    font-family: "Cookie", sans-serif;
    font-size: 3em;
    color: var(--main);
    border: none;
    border-bottom: 1px solid var(--main);
    outline: none;

    &--upload {
      position: relative;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
  }

  &__select {
    margin: -2px 0 0 10px;
    font-family: "Pirata One", sans-serif;
    font-size: 3em;
    color: var(--main);
    border: none;
    outline: none;
    cursor: pointer;
  }

  &__button {
    font-family: "Pirata One", sans-serif;
    font-size: 3.2em;
    font-weight: normal;
    line-height: 1;
    color: var(--main);
    border: none;
    cursor: pointer;

    &:disabled, &[disabled] {
      color: var(--second);
      pointer-events: none;
    }
  }
}
</styles>