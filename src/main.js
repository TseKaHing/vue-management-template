import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import md5 from 'js-md5'
import Lockr from "lockr"
import axios from "axios";
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import SlideVerify from 'vue-monoplasty-slide-verify';

Vue.use(iView)
Vue.config.productionTip = false
Vue.use(SlideVerify);

window.Lockr = Lockr
window.axios = axios;
window.md5 = md5
// 全局的axios默认值
Vue.prototype.$axios = axios
axios.defaults.timeout = 1000 * 15;
axios.defaults.headers.common['Authorization'] = Lockr.get('token')
// console.log(axios.defaults.headers)
axios.defaults.headers.post["Content-Type"] = "application/json";


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
