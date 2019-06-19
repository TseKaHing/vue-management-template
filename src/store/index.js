import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist";
import state from './state'
import mutations from './mutations'
import actions from './actions'
import user from './module/user'
// import saveInLocal from './plugin/saveInLocal'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
});

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    user
  },
  // plugins: [saveInLocal]
  plugins: [vuexLocal.plugin]
})
