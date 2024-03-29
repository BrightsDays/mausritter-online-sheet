import { setActivePinia, createPinia } from 'pinia'
import changeStat from '../../src/helpers/rollStats'
import { useCharacterStore } from '../../src/store/character'
import { StatKeys } from '../../src/types'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('ChangeStat', () => {
  test('update stats in store', () => {
    const character = useCharacterStore()
    const statList = ['str', 'maxStr', 'dex', 'maxDex', 'wil', 'maxWil', 'hp', 'maxHp', 'pips', 'startPips']

    statList.forEach(stat => {
      changeStat(stat, 6)
      
      expect(character[stat as StatKeys]).toBe(6)
    })
  })

  test('don\'t add new fields', () => {
    const character = useCharacterStore()
    const statList = ['newField', 'testField']
    
    statList.forEach(stat => {
      changeStat(stat, 6)
      
      expect(character[stat as StatKeys]).toBeUndefined()
    })
  })
})