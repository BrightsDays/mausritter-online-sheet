import { createStore, Commit } from 'vuex'

const state = {
    name: '',
    exp: 0,
    str: 0,
    dex: 0,
    wil: 0,
    startHp: 0,
    hp: 0,
    pips: 0
}

const mutations = {
    setStat (state: any, payload: Payload) {
        state[payload.statName] = payload.statValue
    }
}

const  actions = {
    setStat: ({ commit }: {commit: Commit}, payload: object) => commit('setStat', payload)
}

export default createStore({
    state,
    mutations,
    actions
})
