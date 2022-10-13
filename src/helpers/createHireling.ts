import { Hireling } from '../types'
import rollDices from './rollDices'
import detailsList from '../data/detailsList.json'
import { useStore } from '../store/character'

export default (name: string): Hireling => {
  const characterStore = useStore()

  const stats = {
    str: rollDices(2,6),
    dex: rollDices(2,6),
    wil: rollDices(2,6),
    hp: rollDices(1,6)
  }

  return {
    index: characterStore.hirelings.length,
    name: name,
    level: 1,
    exp: 0,
    stats: {
      str: {
        name: 'str',
        max: stats.str,
        current: stats.str
      },
      dex: {
        name: 'dex',
        max: stats.dex,
        current: stats.dex
      },
      wil: {
        name: 'wil',
        max: stats.wil,
        current: stats.wil
      },
      hp: {
        name: 'hp',
        max: stats.hp,
        current: stats.hp
      }
    },
    bodyBack: {
      'Main Paw': {
        name: 'Main Paw',
        item: null,
        used: 0
      },
      'Second Paw': {
        name: 'Second Paw',
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
      }
    },
    details: detailsList[rollDices(1, detailsList.length) - 1]
  }
}