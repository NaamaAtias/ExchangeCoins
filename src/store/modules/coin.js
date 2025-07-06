import { coinService } from '@/services/coinService'

export default {
  strict: true,
  state: {
    coins: [],
    // contact: null,
  },

  mutations: {
    setCoins(state) {
      const coins = coinService.get10Coins()
      state.coins = coins
    },
  },

  actions: {
    // async loadcoins({ commit }) {
    //   const coins = await coinService.get10Coins()
    //   commit({ type: 'setCoins', coins })
    // },
  },

  getters: {
    coins: (state) => state.coins,
  },
}
