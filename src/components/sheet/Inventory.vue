<template>
  <div class="inventory">
    <div class="body-items">
      <div class="body-items__item" v-for="item in bodyBack" :key="item">
        <span class="body-items__name">{{ item.name }}</span>
      </div>
    </div>
    <div class="pack-items">
      <vue-draggable-next
          class="pack-items__list"
          v-model="packItems"
          group="items"
      >
        <template v-for="item in packItems" :key="item.title">
          <div
              v-if="item.group === 'conditions'"
              class="pack-items__item conditions__item"
          >
            <span class="conditions__title">{{ item.title}}</span>
            <span class="conditions__description">{{item.description}}</span>
            <span class="conditions__clear"><b class="conditions__clear">Clear:</b><br>{{item.clear}}</span>
          </div>
          <div
              v-if="item.group === 'items'"
              class="pack-items__item items__item"
          >
            <span class="items__title">{{ item.title }}</span>
            <div class="items__status">
              <ui-item-checkbox />
              <span class="items__stat">{{ item.stat }}</span>
            </div>
            <span class="items__type">{{ item.type }}</span>
          </div>
        </template>
      </vue-draggable-next>
      <div class="pack-items__back" v-for="item in packBack" :key="item.name">
        <span class="pack-items__name">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VueDraggableNext } from 'vue-draggable-next'
import {computed} from 'vue'
import {useStore} from 'vuex'
import UiItemCheckbox from '../ui/UiItemCheckboxes.vue'

const store = useStore()

const packItems = computed({
  get: () => store.state.items,
  set: (value) => store.dispatch('updateItems', value)
})

const bodyBack = {
  mainPaw: {name: 'Main paw'},
  firstBody: {name: 'Body'},
  offPaw: {name: 'Second Paw'},
  secondBody: {name: 'Body'}
}

const packBack = [
  {name: '1'},
  {name: '2'},
  {name: '3'},
  {name: '4'},
  {name: '5'},
  {name: '6'}
]
</script>

<style lang="scss">
.inventory {
  display: flex;
  justify-content: space-between;
}

.body-items {
  display: grid;
  position: relative;
  grid-template-columns: 120px 120px;
  grid-template-rows: 120px 120px;
  border: 2px dashed var(--second);
  overflow: hidden;

  &__item {
    border: 2px dashed var(--second);
    margin: -2px;
  }

  &__name {
    display: inline-block;
    text-align: center;
    font-family: 'Pirata One', sans-serif;
    font-size: 2em;
    line-height: 1;
    color: var(--second);
    margin-top: 10px;
  }
}

.pack-items {
  position: relative;
  display: grid;
  grid-template-columns: 120px 120px 120px;
  grid-template-rows: 120px 120px;
  border: 2px solid var(--main);
  overflow: hidden;

  &__list {
    position: absolute;
    display: grid;
    grid-template-columns: 120px 120px 120px;
    grid-template-rows: 120px 120px;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: none;
  }

  &__item {
    border: 2px solid var(--main);
    margin: -2px;
  }

  &__back {
    border: 2px dashed var(--second);
    margin: -2px;
  }

  &__name {
    display: inline-block;
    text-align: center;
    font-family: 'Pirata One', sans-serif;
    font-size: 4em;
    line-height: 1;
    color: var(--second);
    margin-top: 40px;
  }
}
</style>
