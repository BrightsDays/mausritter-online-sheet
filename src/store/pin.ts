import { defineStore } from 'pinia'

export const useStore = defineStore('pin',{
    state: () => ({
        name: '',
        exp: 0,
        str: 0,
        dex: 0,
        wil: 0,
        startHp: 0,
        hp: 0,
        startPips: 0,
        pips: 0,
        grit: 0,
        items: []
    }),
    actions: {
        setStat (statName: String, statValue: String) {
            this[statName] = statValue
        },
        // updateItems(state: any, payload: Payload) {
        //     state.items = payload;
        // }
    }
})