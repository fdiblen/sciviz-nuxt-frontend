// axios.js

import axios from 'axios'


export const state = () => ({
    coins: []
})

export const mutations = {
    SET_COINS (state, coins) {
        state.coins = coins
      }
}

export const actions = {
    loadCoins ({ commit }) {
        axios
          .get('http://localhost:4000/results')
          .then(r => r.data)
          .then(coins => {
            commit('SET_COINS', coins)
          })
      }
}