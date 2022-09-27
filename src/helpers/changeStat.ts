import { useStore } from '../store/character'
import { StatKeys } from '../types'

export default (statName: string, event: Event) => {
    const pin = useStore()
    const value = (event.target as HTMLInputElement).value

    pin.setStat(statName as StatKeys, +value)
}
