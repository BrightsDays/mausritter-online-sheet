import { useStore } from '../store/character'

export default (statName: string, event: Event) => {
    const pin = useStore()
    const value = (event.target as HTMLInputElement).value

    pin.setStat(statName, value)
}
