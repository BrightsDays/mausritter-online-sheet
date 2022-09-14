import { useStore } from '../store/pin'

export default (statName: string, event: Event) => {
    const pin = useStore()
    const value = (event.target as HTMLInputElement).value

    pin.setStat(statName, value)
}
