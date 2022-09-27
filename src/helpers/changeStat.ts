import { useStore } from '../store/character'
import { StatKeys } from '../types'

export default (statName: string, event: Event) => {//TODO: use value, not event
  const character = useStore()
  const value = (event.target as HTMLInputElement).value

  if (Object.keys(character).includes(statName)) {
    character.setStat(statName as StatKeys, +value)
  }
}
