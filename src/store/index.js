import Vue from 'vue'
import Vuex from 'vuex'
// import permission from './modules/permission'
import city from './modules/city'
import hospital from './modules/hospital'
// import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // permission,
    // user,
    city,
    hospital
  },
  getters
})

export default store
