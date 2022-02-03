<template>
  <div class="inventory">
    <div class="body-items">
      <div class="body-items__item" v-for="item in bodyItems" :key="item">
        <span class="body-items__name">{{ item.name }}</span>
      </div>
    </div>
    <div class="pack-items">
      <div class="pack-items__item" v-for="item in packItems" :key="item.name">
        <span class="pack-items__name">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  bodyItems: {type: Object},
  packItems: {type: Array}
})
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
  display: grid;
  grid-template-columns: 120px 120px 120px;
  grid-template-rows: 120px 120px;
  border: 2px solid var(--main);
  overflow: hidden;

  &__item {
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
