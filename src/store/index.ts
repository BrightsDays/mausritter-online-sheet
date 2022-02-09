import { createStore, Commit } from 'vuex'

const state = {
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
}

const mutations = {
    setStat (state: any, payload: Payload) {
        state[payload.statName] = payload.statValue
    },
    updateItems(state: any, payload: Payload) {
        state.items = payload;
    }
}

const  actions = {
    setStat: ({ commit }: {commit: Commit}, payload: object) => commit('setStat', payload),
    updateItems({ commit }: {commit: Commit}, payload: object) {
        commit("updateItems", payload);
    }
}

export default createStore({
    state,
    mutations,
    actions
})
