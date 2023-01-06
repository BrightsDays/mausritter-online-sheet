<template>
  <new-popup-layout
    v-if="!informed"
    title="New character"
  >
    <template #body>
      <span class="content">This will delete your current character.</span>
    </template>
    <template #footer>
      <UiButton
        text="Cancel"
        type="big"
        @click.prevent="userNotInformed()"
      />
      <UiButton
        text="OK"
        type="big"
        @click.prevent="userInformed()"
      />
    </template>
  </new-popup-layout>
  <new-popup-layout
    v-else
    title="New character"
  >
    <template #body>
      <UiInput
        v-model="characterStore.name"
        label="Name"
        type="text"
      />
      <div class="content">
        <span class="stat">STR: {{ characterStore.stats.str.max }}</span>
        <span class="stat">DEX: {{ characterStore.stats.dex.max }}</span>
        <span class="stat">WIL: {{ characterStore.stats.wil.max }}</span>
      </div>
      <div class="swap">
        <span class="content">Swap stats *</span>
        <div class="inputs">
          <UiSelect
            v-model="swapStats.first"
            :options="['str', 'dex', 'wil']"
            to-uppercase
          />
          <span class="content center">and</span>
          <UiSelect
            v-model="swapStats.second"
            :options="['str', 'dex', 'wil']"
            to-uppercase
          />
        </div>
      </div>
      <span class="content small">* This change will only take effect after character creation</span>
      <UiSelect
        v-if="selectItem" 
        v-model="startItem"
        label="Select item"
        :options="Object.values(itemsForSelect)"
      />
      <UiSelect
        v-model="weapon"
        label="Select weapon"
        :options="weaponsForSelect"
      />
    </template>
    <template #footer>
      <UiButton
        text="Cancel"
        type="big"
        @click.prevent="close()"
      />
      <UiButton
        :disabled="characterStore.name.length < 3 || 
          (selectItem && startItem === '') ||
          !weapon"
        text="Create"
        type="big"
        @click.prevent="saveCharacter()"
      />
    </template>
  </new-popup-layout>
</template>

<script setup lang="ts">
import NewPopupLayout from './PopupLayout.vue'
import rollDices from '../../helpers/rollDices'
import rollStats from '../../helpers/rollStats'
import weaponList from '../../data/weaponList.json'
import utilityList from '../../data/utilityList.json'
import detailsList from '../../data/detailsList.json'
import spellList from '../../data/spellList.json'
import armorList from '../../data/armorList.json'
import backgroundList from '../../data/backgroundList.json'
import { BackgroundKeys, Item, StatKeys } from '../../types'
import { useCharacterStore } from '../../store/character'
import { onMounted, onUnmounted, ref } from 'vue'
import { usePopupStore } from '../../store/popup'
import createHireling from '../../helpers/createHireling'
import { useNotificationsStore } from '../../store/notifications'
import UiButton from '../ui/UiButton.vue'
import UiInput from '../ui/UiInput.vue'
import UiSelect from '../ui/UiSelect.vue'

const informed = ref(false)

const characterStore = useCharacterStore()
const popupStore = usePopupStore()
const notificationStore = useNotificationsStore()
let save = false

const statsForSwap = ref({
  str: 0,
  dex: 0,
  wil: 0
})
const swapStats = ref({
  first: 'str',
  second: 'str'
})

const itemsForSelect = ref({
  itemA: '',
  itemB: ''
})
const weaponsForSelect = ['Light', 'Medium', 'Heavy', 'Light ranged', 'Heavy ranged']
const startItem = ref('')
const weapon = ref(weaponsForSelect[0])
const selectItem = ref(true)

const close = () => popupStore.setPopup(null)

const createCharacter = () => {
  characterStore.clearCharacter()

  const pips = rollDices(1, 6)
  characterStore.setValue('pips', pips)
  characterStore.setValue('startPips', pips)

  rollStats(characterStore)

  statsForSwap.value = {
    str: characterStore.stats.str.current,
    dex: characterStore.stats.dex.current,
    wil: characterStore.stats.wil.current
  }
  notificationStore.setNotification({
    type: 'info',
    message: `New character was rolled: 
      STR: ${characterStore.stats.str.current}, DEX: ${characterStore.stats.dex.current}, WIL: ${characterStore.stats.wil.current}, 
      HP: ${characterStore.stats.hp.max}, Pips: ${pips}`
  })

  const background =
    backgroundList[characterStore.stats.hp.max as BackgroundKeys][characterStore.pips as BackgroundKeys].background
  characterStore.setDescription('background', background)

  itemsForSelect.value.itemA =
    backgroundList[characterStore.stats.hp.max as BackgroundKeys][characterStore.pips as BackgroundKeys].itemA
  itemsForSelect.value.itemB =
    backgroundList[characterStore.stats.hp.max as BackgroundKeys][characterStore.pips as BackgroundKeys].itemB
  startItem.value = itemsForSelect.value.itemA

  if (!Object.values(statsForSwap.value).filter(item => item > 9).length) {
    selectItem.value = false
  }
}

const saveCharacter = () => {
  if (characterStore.name.length >= 3
      && (!selectItem.value || startItem.value !== '')
      && weapon) {//TODO fix this position
    if (swapStats.value.first !== swapStats.value.second) {      
      characterStore.setStat(
        swapStats.value.first as StatKeys,
        statsForSwap.value[swapStats.value.second.toLowerCase() as 'str' | 'dex' | 'wil']
      )
      characterStore.setMaxStat(
        swapStats.value.first as StatKeys,
        statsForSwap.value[swapStats.value.second.toLowerCase() as 'str' | 'dex' | 'wil']
      )

      characterStore.setStat(
        swapStats.value.second as StatKeys,
        statsForSwap.value[swapStats.value.first.toLowerCase() as 'str' | 'dex' | 'wil']
      )
      characterStore.setMaxStat(
        swapStats.value.second as StatKeys,
        statsForSwap.value[swapStats.value.first.toLowerCase() as 'str' | 'dex' | 'wil']
      )
    }

    const findItem = (title: string) => {
      console.log(title, spellList.list.find(item => item.title === title));
      
      return (
        utilityList.list.find(item => item.title === title) as Item ||
        weaponList.list.find(item => item.title === title) as Item ||
        armorList.list.find(item => item.title === title) as Item ||
        spellList.list.find(item => item.title === title) as Item )
    }

    const isHireling = (item: string): Item | null => {
      if (item.includes('Hireling')) {
        characterStore.addHireling(createHireling(item))
        return null
      }
      
      return findItem(item)
    }

    characterStore.updateItems('bodyBack', {
      'Main Paw': {
        name: 'Main Paw',
        item: null
      },
      'Main Body': {
        name: 'Main Body',
        item: null
      },
      'Second Paw': {
        name: 'Second Paw',
        item: null
      },
      'Second Body': {
        name: 'Second Body',
        item: null
      }
    })

    characterStore.updateItems('packBack', {    
      1: {
        name: '1',
        item: weaponList.list.find(item => item.type === weapon.value) as Item
      },
      2: {
        name: '2',
        item: {
          title: 'Torches',
          stat: '',
          image: '',
          type: 'Utility',
          group: 'items',
          used: 0
        }
      },
      3: {
        name: '3',
        item: {
          title: 'Rations',
          stat: '',
          image: '',
          type: 'Utility',
          group: 'items',
          used: 0
        }
      },
      4: {
        name: '4',
        item: selectItem.value 
          ? isHireling(startItem.value)
          : findItem(itemsForSelect.value.itemA)
      },
      5: {
        name: '5',
        item: selectItem.value
          ? null 
          : isHireling(itemsForSelect.value.itemB)
      },
      6: {
        name: '6',
        item: null
      }
    })

    const birthSign = ['Star', 'Wheel', 'Acorn', 'Storm', 'Moon', 'Mother']
    characterStore.setDescription('birthSign', birthSign[rollDices(1, 6) - 1])

    const color = ['Chocolate', 'Black', 'White', 'Tan', 'Grey', 'Blue']
    const pattern = ['Solid', 'Brindle', 'Patchy', 'Banded', 'Marbled', 'Flecked']

    characterStore.setDescription('coat', `${color[rollDices(1, 6) - 1]} ${pattern[rollDices(1, 6) - 1]}`)
    characterStore.setDescription('details', detailsList[rollDices(1, detailsList.length) - 1])

    save = true

    selectItem.value = true
    startItem.value = ''
    weapon.value = ''

    close()
  }
}

const userNotInformed = () => {
  save = true
  close()
}

const userInformed = () => {
  notificationStore.setNotification({
    type: 'info',
    message: 'Character sheet has been cleared'
  })
  save = false
  informed.value = true
  createCharacter()
}

onMounted(() => {
  if (!characterStore.name) informed.value = true
  if (characterStore.name) save = true
  if (informed.value) createCharacter()
})

onUnmounted(() => {
  if (!save) characterStore.clearCharacter()
})
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: space-between;
  font-family: "Pirata One", sans-serif;
  font-size: 3.2em;
  color: var(--second);

  &.small {
    text-align: center;
    font-family: "Ubuntu", sans-serif;
    font-size: 1.4em;
    color: var(--second);
  }

  &.center {
    margin: 0 auto;
  }

  .stat {
    font-size: 1em;
  }
}

.swap {
  display: flex;
  justify-content: space-between;

  .inputs {
    display: flex;
    align-items: baseline;
    gap: 20px;
  }
}
</style>