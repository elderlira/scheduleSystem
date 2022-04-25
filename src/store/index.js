import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataStorage: {
      dataInicial: '',
      dataFinal: ''
    }
  },
  mutations: {
    GET_PERIODS_DATE(state, payload) {
      state.dataStorage.dataInicial = payload.inicial,
      state.dataStorage.dataFinal = payload.final
    }
  },
  actions: {
  },
  modules: {
  }
})
