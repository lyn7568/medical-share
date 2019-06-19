import 'babel-polyfill'
import Vue from 'vue'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import '../theme/index.css'
import '@/styles/index.scss'

import App from './App'
import router from './router'
import store from './store'

// import '@/icons' // icon
// import '@/permission' // permission control

import request from './utils/request'
Vue.prototype.$http = request
import './utils/filter'

import BackTop from '@/components/BackTop'
import DefaultTip from '@/components/DefaultTip'
import PullDown from '@/components/PullDown'
Vue.use(BackTop)
Vue.use(DefaultTip)
Vue.use(PullDown)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    this.$store.dispatch('getDictHospital')
    router.afterEach((to, from, next) => {
      document.title = to.meta.title
      window.scrollTo(0, 0)
    })
  }
})
