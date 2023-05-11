import { SimpleCard } from '../types/cards'
import rollDices from './rollDices'
import detailsList from '../data/detailsList.json'
import { useCharacterStore } from '../store/character'

export default (name?: string, warband?: boolean): SimpleCard => {
  const characterStore = useCharacterStore()

  const stats = !warband ? {
    str: rollDices(2,6),
    dex: rollDices(2,6),
    wil: rollDices(2,6),
    hp: rollDices(1,6)
  } : {
    str: 10,
    dex: 10,
    wil: 10,
    hp: rollDices(1,6)
  }

  const simpleCard: SimpleCard = {
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
        item: !warband ? null : {
          title: 'Club',
          stat: 'd6',
          image: 'Club',
          type: 'Light',
          group: 'items',
          used:  0
        }
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

  if (name) {
    simpleCard.index = characterStore.hirelings.length
    simpleCard.name = name
    simpleCard.details = detailsList[rollDices(1, detailsList.length) - 1]
  }

  return simpleCard
}