import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import Cookies from 'js-cookie' // cookie
import i18n from './lang' // lang
import vuetify from './plugins/vuetify' // vuetify
import './permission' // permission control
import '@/styles/index.scss'
import './utils/error-log' // error log
import * as filters from './filters' // global filters

Vue.config.productionTip = false

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
