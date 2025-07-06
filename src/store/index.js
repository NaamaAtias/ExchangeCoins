import { createStore } from 'vuex'
import coin from './modules/coin'

const storeOptions = {
  strict: true,
  state: {},
  mutations: {},
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    },
  },
  getters: {},
  modules: {
    coin,
  },
}

const store = createStore(storeOptions)

export default store
