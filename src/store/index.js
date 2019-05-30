import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    firstName: 'zhang',
    lastName: 'san'
  },
  getters: {
    name: state => {
      return state.firstName + state.lastName
    }
  },
  mutations: {
    changeState(state, num) {
      this.state.count += num;
    }
  }
})
