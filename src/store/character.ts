import { defineStore } from 'pinia'
import { BodyBack, Character, StatKeys, DescriptionKeys, PackBack, Hireling, ValueKeys } from '../types'

export const useStore = defineStore('character', {
  state: (): Character => ({
    name: '',
    exp: 0,
    stats: {
      str: {
        name: 'str',
        max: 0,
        current: 0
      },
      dex: {
        name: 'dex',
        max: 0,
        current: 0
      },
      wil: {
        name: 'wil',
        max: 0,
        current: 0
      },
      hp: {
        name: 'hp',
        max: 0,
        current: 0
      }
    },
    startPips: 0,
    pips: 0,
    background: '',
    bodyBack: {
        'Main Paw': {
          name: 'Main Paw',
          item: null,
          used: 0
        },
        'Main Body': {
          name: 'Main Body',
          item: null,
          used: 0
        },
        'Second Paw': {
          name: 'Second Paw',
          item: null,
          used: 0
        },
        'Second Body': {
          name: 'Second Body',
          item: null,
          used: 0
        }
    },
    packBack: {
        1: {
          name: '1',
          item: null,
          used: 0
        },
        2: {
          name: '2',
          item: null,
          used: 0
        },
        3: {
          name: '3',
          item: null,
          used: 0
        },
        4: {
          name: '4',
          item: null,
          used: 0
        },
        5: {
          name: '5',
          item: null,
          used: 0
        },
        6: {
          name: '6',
          item: null,
          used: 0
        },
    },
    hirelings: [],
    birthSign: '',
    coat: '',
    details: '',
    grit: 0
  }),
  actions: {
    setStat(statName: StatKeys, payload: number, hirelingIndex?: number) {      
      !(typeof hirelingIndex === 'number')
        ? this.stats[statName].current = payload
        : this.hirelings[hirelingIndex].stats[statName].current = payload
    },
    setMaxStat(statName: StatKeys, payload: number) {
      this.stats[statName].max = payload
    },
    setValue(value: ValueKeys, payload: number) {
      this[value] = payload
    },
    setDescription(descName: DescriptionKeys, payload: string) {
      this[descName] = payload
    },
    updateItems(packName: 'bodyBack' | 'packBack', payload: BodyBack | PackBack) {
      if (packName === 'bodyBack') {
        this.bodyBack = payload as BodyBack
      } else if (packName === 'packBack') {
        this.packBack = payload as PackBack
      }
    },

    addHireling(payload: Hireling) {      
      this.hirelings = [ ...this.hirelings, payload]
    },

    clearCharacter() {
      this.$state = {
        name: '',
        exp: 0,
        stats: {
          str: {
            name: 'str',
            max: 0,
            current: 0
          },
          dex: {
            name: 'dex',
            max: 0,
            current: 0
          },
          wil: {
            name: 'wil',
            max: 0,
            current: 0
          },
          hp: {
            name: 'hp',
            max: 0,
            current: 0
          }
        },
        startPips: 0,
        pips: 0,
        background: '',
        bodyBack: {
            'Main Paw': {
              name: 'Main Paw',
              item: null,
              used: 0
            },
            'Main Body': {
              name: 'Main Body',
              item: null,
              used: 0
            },
            'Second Paw': {
              name: 'Second Paw',
              item: null,
              used: 0
            },
            'Second Body': {
              name: 'Second Body',
              item: null,
              used: 0
            }
        },
        packBack: {
            1: {
              name: '1',
              item: null,
              used: 0
            },
            2: {
              name: '2',
              item: null,
              used: 0
            },
            3: {
              name: '3',
              item: null,
              used: 0
            },
            4: {
              name: '4',
              item: null,
              used: 0
            },
            5: {
              name: '5',
              item: null,
              used: 0
            },
            6: {
              name: '6',
              item: null,
              used: 0
            },
        },
        hirelings: [],
        birthSign: '',
        coat: '',
        details: '',
        grit: 0
      }
    }
  }
})