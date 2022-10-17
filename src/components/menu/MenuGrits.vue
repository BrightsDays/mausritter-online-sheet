<template>
  <div class="grits">
    <div class="banked-items">
      <div
        v-if="characterStore.exp >= 1000"
        :id="`${characterStore.grit.grit__1.name}`"
        class="banked-items__item"
        @drop="event => drop(event, 'grit', characterStore)"
        @dragover="allowDrop"
        @dragleave="leaveDrag"
      >
        <div v-if="!characterStore.grit.grit__1.item" />

        <ui-condition-card
          v-else
          :condition="characterStore.grit.grit__1.item"
          class="banked-items__card"
        />
      </div>
      <div
        v-if="characterStore.exp >= 3000"
        :id="`${characterStore.grit.grit__2.name}`"
        class="banked-items__item"
        @drop="event => drop(event, 'grit', characterStore)"
        @dragover="allowDrop"
        @dragleave="leaveDrag"
      >
        <div v-if="!characterStore.grit.grit__2.item" />

        <ui-condition-card
          v-else
          :condition="characterStore.grit.grit__2.item"
          class="banked-items__card"
        />
      </div>
      <div
        v-if="characterStore.exp >= 5000"
        :id="`${characterStore.grit.grit__3.name}`"
        class="banked-items__item"
        @drop="event => drop(event, 'grit', characterStore)"
        @dragover="allowDrop"
        @dragleave="leaveDrag"
      >
        <div v-if="!characterStore.grit.grit__3.item" />

        <ui-condition-card
          v-else
          :condition="characterStore.grit.grit__3.item"
          class="banked-items__card"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '../../store/character'
import { allowDrop, leaveDrag, drop } from '../../helpers/dragNDrop'
import UiConditionCard from '../ui/UiConditionCard.vue'

const characterStore = useCharacterStore()
</script>