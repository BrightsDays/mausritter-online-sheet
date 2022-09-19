<template>
  <div class="about">
    <div class="about__bio">
      <div class="about__name about-input">
        <label
          class="about-input__label"
          for="name"
        >Name</label>
        <input
          id="name"
          v-model="character.name"
          class="about-input__input"
        >
      </div>
      <div class="about__background about-input">
        <label
          class="about-input__label about-input__label--small"
          for="background"
        >Background</label>
        <input
          id="background"
          v-model="character.background"
          class="about-input__input about-input__input--small"
          readonly
        >
      </div>
    </div>
    <div class="about__details">
      <div class="details-input">
        <label
          class="details-input__label"
          for="birthsign"
        >Birthsign</label>
        <input
          id="birthsign"
          v-model="character.birthSign"
          class="details-input__input"
          readonly
        >
      </div>
      <div class="details-input">
        <label
          class="details-input__label"
          for="coat"
        >Coat</label>
        <input
          id="coat"
          v-model="character.coat"
          class="details-input__input"
        >
      </div>
      <div class="details-input">
        <label
          class="details-input__label"
          for="look"
        >Look</label>
        <input
          id="look"
          v-model="character.details"
          class="details-input__input"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '../../store/character'

const character = useStore()
</script>

<style lang="scss">
.about {
  display: flex;
  justify-content: space-between;
  gap: 15px;

  &__bio,&__details {
    display: flex;
    width: 60%;
    flex-direction: column;
    padding: 15px;
    border: 2px solid var(--main);
    border-radius: 10px;
  }

  &__details {
    width: 40%;
    justify-content: space-between;
  }

  &__name {
    border-bottom: 2px solid var(--second);
  }

  &__background {
    padding-top: 10px;
  }
}

.about-input {
  display: flex;
  justify-content: space-between;
  gap: 20px;

  &__label {
    font-family: 'Pirata One', sans-serif;
    font-size: 4em;
    line-height: 1;
    color: var(--main);

    &--small {
      font-size: 2.2em;
      line-height: 1;
      color: var(--second);
    }
  }

  &__input {
    width: 100%;
    border: none;
    font-family: 'Cookie', sans-serif;
    font-size: 4em;
    line-height: 1;
    color: var(--main);
    outline: none;

    &--small {
      font-size: 2.2em;
      line-height: 1;
    }
  }
}

.details-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  &__label {
    font-family: 'Ubuntu', sans-serif;
    color: var(--second);
    font-size: 1.7em;
    line-height: 1;
  }

  &__input {
    width: 100%;
    font-family: 'Cookie', sans-serif;
    color: var(--main);
    font-size: 2.2em;
    line-height: 1;
    border: none;
    outline: none;
  }
}
</style>
