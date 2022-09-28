import { useStore } from '../store/character'
import { StatKeys } from '../types'

export default (statName: string, value: number) => {
  const character = useStore()

  if (Object.keys(character).includes(statName)) {
    character.setStat(statName as StatKeys, +value)
  }
}
