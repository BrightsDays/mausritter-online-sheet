import { StatKeys } from '../types'
import rollDices from './rollDices'

export default (statList: StatKeys[], store: any) => {
  statList.forEach(item => {
    const value = (item === 'hp' || item === 'pips') ?
        rollDices(1, 6) :
        rollDices(3, 6, 'min')

    store.setStat(item as StatKeys, value)
    store.setStat((`max${item.charAt(0).toUpperCase() + item.slice(1)}` as StatKeys), value)

    if (item === 'hp') {
      store.setStat('hp', value)
      store.setStat('maxHp', value)
    }

    if (item === 'pips') {
      store.setStat('startPips', value)
    }
  })
}