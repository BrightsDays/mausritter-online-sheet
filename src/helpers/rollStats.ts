import { StatKeys } from '../types'
import rollDices from './rollDices'

export default (store: any) => {
  ['str', 'dex', 'wil', 'hp'].forEach(item => {
    const value = (item === 'hp') ?
      rollDices(1, 6) :
      rollDices(3, 6, 'min')

    store.setStat(item as StatKeys, value)
    store.setMaxStat(item as StatKeys, value)

    if (item === 'hp') {
      store.setStat('hp', value)
      store.setMaxStat('hp', value)
    }
  })
}