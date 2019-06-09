import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    showPreloader: false,
    // eslint-disable-next-line
    baseUrl: 'http://AcerOld:8080/',
    previosUrl: '',
    token: ''
  },
  mutations: {
    showPreloader (state) {
      state.showPreloader = true
    },
    hidePreloader (state) {
      state.showPreloader = false
    },
    updateToken (state) {
      state.token = JSON.parse(localStorage.getItem('accessToken'))
    },
    previusURL (state) {
      state.previosUrl = window.location.href
    },
    cleanPreviusURL (state) {
      state.previosUrl = ''
    }
  }
})
