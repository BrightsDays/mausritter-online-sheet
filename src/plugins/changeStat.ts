import store from '../store'

export default (statName: string, event: Event) => {
    const value = (event.target as HTMLInputElement).value

    store.dispatch('setStat', {
        statName: statName,
        statValue: value
    })
}
