import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clients: []
  },
  mutations: {
    addClient(state, payload) {
      const { name, surname, email, number } = payload.obj;
      const obj = {
        name,
        surname,
        email,
        number,
        packageDelivery: payload.obj.packageInfo
      }
      state.clients.push(obj)
    },
  },
  actions: {
    addClient(context, obj) {
      context.commit('addClient', { obj })
    },
  },
  getters: {
    getClients(state) {
      return state.clients
    },
  }
})
