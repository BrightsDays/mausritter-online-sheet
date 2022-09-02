import { defineStore } from 'pinia'
import { Payload } from 'vuex';

export const useStore = defineStore('pin',{
  state: () => ({
    name: '',
    exp: 0,
    str: 0,
    dex: 0,
    wil: 0,
    startHp: 0,
    hp: 0,
    startPips: 0,
    pips: 0,
    grit: 0,
    bodyBack: {
        1: {
          name: 'Main paw',
          item: null
        },
        2: {
          name: 'Body',
          item: null
        },
        3: {
          name: 'Second Paw',
          item: null
        },
        4: {
          name: 'Body',
          item: null
        }
    },
    packBack: {
        1: {
          name: 1,
          item: null
        },
        2: {
          name: 2,
          item: null
        },
        3: {
          name: 3,
          item: null
        },
        4: {
          name: 4,
          item: null
        },
        5: {
          name: 5,
          item: null
        },
        6: {
          name: 6,
          item: null
        },
    }
  }),
  actions: {
    setStat (statName: String, statValue: String) {
      this[statName] = statValue
    },
    updateItems(packName: String, payload: any) {
      this[packName] = payload
    }
  }
})