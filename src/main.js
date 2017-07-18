import Vue from 'vue'
import Lazyload from 'vue-lazyload'

import App from './App'
import router from './util/router'

Vue.config.productionTip = false
Vue.use(Lazyload)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
