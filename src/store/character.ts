import { defineStore } from 'pinia'
import { BodyBack, Character, StatKeys, DescriptionKeys, PackBack, Hireling, ValueKeys, Bank, GritList } from '../types'

export const useCharacterStore = defineStore('character', {
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
    },
    packBack: {
        1: {
          name: '1',
          item: null
        },
        2: {
          name: '2',
          item: null
        },
        3: {
          name: '3',
          item: null
        },
        4: {
          name: '4',
          item: null
        },
        5: {
          name: '5',
          item: null
        },
        6: {
          name: '6',
          item: null
        },
    },
    hirelings: [],
    birthSign: '',
    coat: '',
    details: '',
    grit: {
      'grit__1': {
        name: 'grit__1',
        item: null
      },
      'grit__2': {
        name: 'grit__2',
        item: null
      },
      'grit__3': {
        name: 'grit__3',
        item: null
      }
    },
    bank: [{
      name: 'bnk__0',
      item: null
    }],
    portrait: null,
    warband: null
  }),
  getters: {
    level: (state) => {
      let result = 1
    
      if (state.exp >= 1000) result = 2
      if (state.exp >= 3000) result = 3
      if (state.exp >= 6000) result = 4 + Math.floor((state.exp - 6000) / 5000)
    
      return result
    }
  },
  actions: {
    setStat(statName: StatKeys, payload: number) {      
      this.stats[statName].current = payload
    },
    setMaxStat(statName: StatKeys, payload: number) {
      this.stats[statName].max = payload
    },
    setValue(value: ValueKeys, payload: number) {
      if (value !== 'pips') {
        this[value] = payload
      } else {
        if (+payload > 250) {
          this[value] = 250
        } else if (+payload === 0) {
          this[value] = 0
        } else {
          this[value] = payload
        }
      }
    },
    setDescription(descName: DescriptionKeys, payload: string) {
      this[descName] = payload
    },
    updateItems(packName: 'bodyBack' | 'packBack', payload: BodyBack | PackBack) {
      if (packName === 'bodyBack') this.bodyBack = payload as BodyBack
      if (packName === 'packBack') this.packBack = payload as PackBack
    },
    setPortrait(payload: string | null) {
      this.portrait = payload
    },

    addHireling(payload: Hireling) {
      this.hirelings = [ ...this.hirelings, payload]
    },
    setHirelingIndex(payload: number) {
      this.hirelingIndex = payload
    },
    setHirelingStat(statName: StatKeys, payload: number, hirelingIndex: number) {      
      this.hirelings[hirelingIndex].stats[statName].current = payload
    },
    removeHireling(payload: number) {
      const index = this.hirelings.findIndex(hireling => {
        return hireling.index === payload
      })

      this.hirelings.splice(index, 1)
    },
    updateHirelingItems(packName: 'bodyBack' | 'packBack',
      payload: BodyBack | PackBack, hirelingIndex: number) {
        packName === 'bodyBack'
          ? this.hirelings[hirelingIndex].bodyBack = payload as BodyBack
          : this.hirelings[hirelingIndex].packBack = payload as PackBack
    },

    addWarband() {
      this.warband = {
        level: 1,
        exp: 0,
        stats: {
          str: {
            name: 'str',
            max: 6,
            current: 1
          },
          dex: {
            name: 'dex',
            max: 6,
            current: 1
          },
          wil: {
            name: 'wil',
            max: 6,
            current: 1
          },
          hp: {
            name: 'hp',
            max: 6,
            current: 1
          }
        },
        bodyBack: {
          'Main Paw': {
            name: 'Main Paw',
            item: null
          },
          'Second Paw': {
            name: 'Second Paw',
            item: null
          }
        },
        packBack: {
          1: {
            name: '1',
            item: null
          },
          2: {
            name: '2',
            item: null
          },
          3: {
            name: '3',
            item: null
          },
          4: {
            name: '4',
            item: null
          }
        }
      }
    },//TODO: Test data
    setWarbandStat(statName: StatKeys, payload: number) {
      if (this.warband) this.warband.stats[statName].current = payload
    },

    updateGrit(payload: GritList) {
      this.grit = payload
    },
    updateBankItems(payload: Bank[]) {
      this.bank = payload
    },

    fillCharacter(payload: Character) {
      this.$state = payload
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
        },
        packBack: {
            1: {
              name: '1',
              item: null
            },
            2: {
              name: '2',
              item: null
            },
            3: {
              name: '3',
              item: null
            },
            4: {
              name: '4',
              item: null
            },
            5: {
              name: '5',
              item: null
            },
            6: {
              name: '6',
              item: null
            },
        },
        hirelings: [],
        birthSign: '',
        coat: '',
        details: '',
        grit: {
          'grit__1': {
            name: 'grit__1',
            item: null
          },
          'grit__2': {
            name: 'grit__2',
            item: null
          },
          'grit__3': {
            name: 'grit__3',
            item: null
          }
        },
        bank: [{
          name: 'bnk__0',
          item: null
        }],
        portrait: '',
        warband: null
      }
    },
    addExperience(exp: number) {
      this.exp += exp
    }
  }
})