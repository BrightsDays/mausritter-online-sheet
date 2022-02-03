<template>
  <div class="info">
    <div class="info__description">
      <label class="description-input__label">Portrait/description</label>
    </div>
    <stats class="info__stats" />
  </div>
</template>

<script setup lang="ts">
import Stats from "./Stats.vue";
</script>

<style lang="scss">
.info {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 15px;

  &__description {
    width: 60%;
    border: 2px dashed var(--second);
    border-radius: 10px;
  }

  &__stats {
    width: 40%;
    margin-top: 90px;
  }
}

.description-input {
  &__label {
    display: inline-block;
    font-family: 'Ubuntu', sans-serif;
    color: var(--second);
    font-size: 1.7em;
    line-height: 1;
    margin-top: 5px;
  }
}
</style>
