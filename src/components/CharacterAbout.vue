<template>
  <div class="about">
    <div class="about__bio">
      <div class="about__name about-input">
        <label class="about-input__label" for="name">Name</label>
        <input
            class="about-input__input"
            id="name"
            v-model="name"
            @input="changeStat('name', $event)"
        />
      </div>
      <div class="about__background about-input">
        <label class="about-input__label about-input__label--small" for="background">Background</label>
        <input
            class="about-input__input about-input__input--small"
            id="background"
            v-model="background"
            readonly
        />
      </div>
    </div>
    <div class="about__details">
      <div class="details-input">
        <label class="details-input__label" for="birthsign">Birthsign</label>
        <input class="details-input__input" id="birthsign" />
      </div>
      <div class="details-input">
        <label class="details-input__label" for="coat">Coat</label>
        <input class="details-input__input" id="coat" />
      </div>
      <div class="details-input">
        <label class="details-input__label" for="look">Look</label>
        <input class="details-input__input" id="look" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useStore} from 'vuex'
import {computed} from 'vue'
import backgroundData from '../data/backgroundList.json'
import changeStat from '../plugins/changeStat'

const store = useStore()
const backgroundList: BackgroundList = backgroundData

const name = computed(() => store.state.name)
const background = computed(() => {
  if (store.state.startHp !== 0 && store.state.startPips !== 0) {
    return backgroundList[store.state.startHp][store.state.startPips].background
  }
})
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
